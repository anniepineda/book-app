'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
let ejs = require('ejs');

require('dotenv').config();
app.use(cors());



app.use( express.static( './public') )


app.set('view engine', 'ejs');

app.get('/', (request, response) =>{
    //ejs's render method takes in a string and an object as its args
    // the object has keys which will be the mad lib fill ins for the rendering (placeholders)
    // if I want to access 'rocky road' from the ejs, I can type <%= iceCreams[1] %>
    // < !--things that run have no = after the <% -->
    //   < !--things we want to print have an = <%= -->
    response.render('pages/index');
  });




app.listen(PORT, () => {
    console.log(`App is on PORT: ${PORT}`);
  })