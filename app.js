const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const app = express();

const sequelize = require('./util/mysqlDatabase');
const listRoutes = require('./routes/list');



app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(express.urlencoded({ extended: false })) // For parsing the body of a POST
   .use(express.json())
   .use(listRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

sequelize.sync()
   .then(result => {
      console.log(result)
   })
   .catch(err => console.log(err))