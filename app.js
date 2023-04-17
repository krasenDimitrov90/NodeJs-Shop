const path = require('path');
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFoundControler = require('./controlers/404');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(pageNotFoundControler);

mongoConnect(() => {
    app.listen(port, () => console.log(`Server is running on visit on http://localhost:${port}`));
});
