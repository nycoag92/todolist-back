const   express     = require('express'),
        app         = express(),
        port        = 3000,
        mongoose    = require('mongoose')
        bodyParser  = require('body-parser');

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/todo', require('./app/todo/route/todoRoute.js'));

mongoose.connect('mongodb://localhost/todo-app', {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {console.log('Database Successfully Connected')},
    error =>{console.log(error)}
);