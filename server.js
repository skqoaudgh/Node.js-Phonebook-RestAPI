const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res ,next) => {
    res.send('Hello World!');
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-rest-shop-zqnku.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})
.then(() => {
    app.listen(3000, () => {
        console.log('express server is opened on port 3000.');
    });
})
.catch((err) => {
    console.error(err);
})