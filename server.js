const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter.user);
app.use('/users', userRouter.users);
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