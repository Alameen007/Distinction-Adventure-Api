const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/distinction';
const app = require('./app');


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log('Server listening on ' + PORT)
});