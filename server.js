const express = require('express');
const mongoose = require('mongoose');

const Auth = require('./middleware/auth');
const isAuth = require('./middleware/isAuth');

const userRouter = require('./routes/user');
const phonebookRouter = require('./routes/phonebook');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(Auth);

app.use('/user', userRouter.user);
app.use('/users', userRouter.users);
app.use('/phonebook', isAuth, phonebookRouter);
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