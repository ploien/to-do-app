const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const app = express();

const sequelize = require('./util/mysqlDatabase');
const userListsRoutes = require('./routes/lists');
const toDoListRoutes = require('./routes/toDoList')

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .use(express.urlencoded({ extended: false })) // For parsing the body of a POST
   .use(express.json())
   .use(express.text())
   .use(userListsRoutes)
   .use(toDoListRoutes);
   

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

sequelize.sync()
   .then(result => {
   })
   .catch(err => console.log(err))