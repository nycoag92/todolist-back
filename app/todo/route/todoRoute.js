const   express = require('express'),
        router = express.Router()
        todoService = require('../service/todoService.js');

router
    .get('/', (req, res) => {
        todoService.list(
            (msg) => {
                res.status(400).json({message: msg})
            },
            (todoList) => {
                res.json(todoList);
            }
        )
    })
    .post('/', (req, res) => {
        todoService.create(
            req.body,
            (msg) => {
                res.status(400).json({message: msg})
            },
            (todo) => {
                res.status(201).json(todo);
            }
        )
    })
    .update('/:id', (req, res) => {
        todoService.update(
            req.body,
            (msg) => {
                res.status(400).json({message: msg})
            },
            (todo) => {
                res.status(200).json(todo);
            }
        )
    })
    .delete('/:id', (req, res) => {
        if (!req.params.id) {
            res.status(400).json({message: 'Id not defined'});
            return;
        }
        
        todoService.delete(
            req.params.id,
            (msg) => {
                res.status(400).json({message: msg})
            },
            () => {
                res.status(204).json();
            }
        );

    })

module.exports = router;