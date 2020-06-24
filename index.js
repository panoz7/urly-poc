const express = require('express');
const app = express();
const expressHandlebars = require('express-handlebars');

const server = app.listen(8000, function () {
    console.log('Server started on port 8000!')
})

const handlebars = expressHandlebars.create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use('/app', express.static('app'));

const apiRoutes = require('./routes/api.js');
app.use('/api',apiRoutes.router);

const appRoutes = require('./routes/app.js');
app.use('/',appRoutes.router);