const todoModel = require('../model/todoModel.js').getModel();

const service = {
    list: (errorCallback, successCallback) => {
        todoModel.find({deleted: null}, (err, todoList) => {
            if (err) {
                errorCallback('There was error getting the list of todo');
                return;
            }

            successCallback(todoList);
        });
    },
    create: (body, errorCallback, successCallback) => {
        let todo = new todoModel();

        if (!body.tittle.trim()) {
            errorCallback('Tittle is invalid');
            return;
        }

        todo.tittle = body.tittle.trim();

        if (body.description && body.description.trim()) {
            todo.description = body.description.trim();
        }

        if (body.expiration) {
            if (isNaN(new Date(body.expiration))) {
                errorCallback('Expiration date is invalid');
                return;
            }
            
            todo.expiration = new Date(body.expiration);
        }

        todo.created = new Date();

        todo.save();
        successCallback(todo);
    }
    update: (body, errorCallback, successCallback) => {
        todoModel.findById(id).then(
            (todo) => {
                if (!body.tittle.trim()) {
                    errorCallback('Tittle is invalid');
                    return;
                }

                todo.tittle = body.tittle.trim();

                if (body.description && body.description.trim()) {
                    todo.description = body.description.trim();
                }

                if (body.expiration) {
                    if (isNaN(new Date(body.expiration))) {
                        errorCallback('Expiration date is invalid');
                        return;
                    }
                    
                    todo.expiration = new Date(body.expiration);
                }

                if (body.completed) {
                    if (isNaN(new Date(body.completed))) {
                        errorCallback('completed date is invalid');
                        return;
                    }
                    
                    todo.completed = new Date(body.completed);
                }

                todo.save();
                successCallback();
            },
            (err) => {
                errorCallback('Error at getting todo');
            }
        );
    },
    delete: (id, errorCallback, successCallback) => {
        todoModel.findById(id).then(
            (todo) => {
                if (!todo) {
                    errorCallback('Todo not find');
                    return;
                }
                
                todo.deleted = new Date();
                todo.save();
                successCallback();
            },
            (err) => {
                errorCallback('Error at getting todo');
            }
        );
    }
}

module.exports = service;