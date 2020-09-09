const   express = require('express'),
        router = express.Router()
        todoService = require('../service/todoService.js');

router
    .get('/', (req, res) => {
        todoService.list().then(
            todoList => {
                res.json(todoList);
            },
            msg => {
                res.status(400).json({message: msg})
            }
        );
    })
    .post('/', (req, res) => {
        todoService.create(req.body).then(
            todo => {
                res.status(201).json(todo);
            },
            msg => {
                res.status(400).json({message: msg})
            }
        );
    })
    .put('/:id', (req, res) => {
        if (!req.params.id) {
            res.status(400).json({message: 'Id not defined'});
            return;
        }

        todoService.update(req.body).then(
            todo => {
                res.status(200).json(todo);
            },
            msg => {
                res.status(400).json({message: msg})
            }
        )
    })
    .delete('/:id', (req, res) => {
        if (!req.params.id) {
            res.status(400).json({message: 'Id not defined'});
            return;
        }
        
        todoService.delete(req.params.id).then(
            () => {
                res.status(204).json();
            },
            msg => {
                res.status(400).json({message: msg})
            }
        )
    });

module.exports = router;