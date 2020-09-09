const todoModel = require('../model/todoModel.js').getModel();

const service = {
    list: () => {
        let promesa = new Promise((resolver, rechazar) => {
            todoModel.find({deleted: null}, (err, todoList) => {
                if (err) {
                    rechazar('There was error getting the list of todo');
                    return;
                }

                resolver(todoList);
            });
        });

        return promesa;
    },
    create: body => {
        let promesa = new Promise((resolver, rechazar) => {
            let todo = new todoModel();

            if (!body.title.trim()) {
                rechazar('Title is invalid');
                return;
            }

            todo.title = body.title.trim();

            if (body.description && body.description.trim()) {
                todo.description = body.description.trim();
            }

            if (body.expiration) {
                if (isNaN(new Date(body.expiration))) {
                    rechazar('Expiration date is invalid');
                    return;
                }
                
                todo.expiration = new Date(body.expiration);
            }

            todo.created = new Date();

            todo.save();
            resolver(todo);
        });
        
        return promesa;
    },
    update: body => {
        let promesa = new Promise((resolver, rechazar) => {
            todoModel.findById(body._id).then(
                (todo) => {
                    if (!body.title.trim()) {
                        rechazar('Title is invalid');
                        return;
                    }

                    todo.title = body.title.trim();

                    if (body.description && body.description.trim()) {
                        todo.description = body.description.trim();
                    }

                    if (body.expiration) {
                        if (isNaN(new Date(body.expiration))) {
                            rechazar('Expiration date is invalid');
                            return;
                        }
                        
                        todo.expiration = new Date(body.expiration);
                    }

                    if (body.completed) {
                        if (isNaN(new Date(body.completed))) {
                            rechazar('completed date is invalid');
                            return;
                        }
                        
                        todo.completed = new Date(body.completed);
                    } else {
                        todo.completed = undefined;
                    }

                    todo.save();
                    resolver(todo);
                },
                (err) => {
                    rechazar('Error at getting todo');
                }
            );
        });
        
        return promesa;
    },
    delete: id => {
        let promesa = new Promise((resolver, rechazar) => {
            todoModel.findById(id).then(
                (todo) => {
                    if (!todo) {
                        rechazar('Todo not find');
                        return;
                    }
                    
                    todo.deleted = new Date();
                    todo.save();
                    resolver();
                },
                (err) => {
                    rechazar('Error at getting todo');
                }
            );
        });
        
        return promesa;
    }
}

module.exports = service;