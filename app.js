const path = require('path');
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoose = require('mongoose');

const User = require('./models/user');

const MONOGODB_URI = 'mongodb+srv://krasendimitrov:n176S6m05sosLrZb@product-app-udemy.znr3hub.mongodb.net/shop?retryWrites=true&w=majority'

const app = express();
const store = new MongoDBStore({
    uri: MONOGODB_URI,
    collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const pageNotFoundControler = require('./controlers/404');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);

app.use((req, res, next) => {
    User.findById('6440206ade342937864e52a8')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(pageNotFoundControler);


mongoose.connect(MONOGODB_URI)
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Kras',
                        email: 'kras@test.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            })


        app.listen(port, () => console.log(`Server is running on visit on http://localhost:${port}`));
    })
    .catch(err => {
        console.log(err);
    });
