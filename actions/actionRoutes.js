express = require('express')
const actionsDb = require('../data/helpers/actionModel')
const projectDb = require('../data/helpers/projectModel')

const router = express.Router();

router.get('/:id', validateActionId, (req, res) => {
    actionsDb.get(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot get the action'})
        })
})

router.post('/', validateAction, (req ,res) => {
    const actionInfo = req.body;
    actionsDb.insert(actionInfo)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot create action'})
        })
})

router.put('/:id', validateAction, validateActionId, (req, res) => {
    actionsDb.update(req.params.id, req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot update action'})
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    actionsDb.remove(req.params.id)
        .then(response => {
            res.status(200).json(req.action)
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot delete action'})
        })
})


function validateActionId(req, res, next) {
    const id = req.params.id
    actionsDb.get(Number(id))
        .then(response => {
            if(response) {
                req.action = response
                next();
            }
            else {
                res.status(400).json({ message: 'Invalid action id'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot fetch action data'})
        })
}

function validateAction(req, res, next) {

    if(!req.body.description || req.body.description.length > 100) {
        res.status(400).json({ message: 'Missing description data or description is over 100 character'})
    }
    else if(!req.body.notes) {
        res.status(400).json({ message: 'Missing notes data'})
    }
    projectDb.get(Number(req.body.project_id))
        .then(response => {
            if(response) {
                next()
            }
            else {
                res.stats(404).json({ message: 'There is no project with given Id'})
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot get project'})
        })
};

module.exports = router;