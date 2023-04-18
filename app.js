const path = require('path');
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFoundControler = require('./controlers/404');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('643e1b5e7007909c6481a157')
        .then(user => {
            req.user = user;
            console.log(user);
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(pageNotFoundControler);

mongoConnect(() => {
    app.listen(port, () => console.log(`Server is running on visit on http://localhost:${port}`));
});
