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

app.get('/', newSearch); 
app.post('/searches', searchBooks);

function Book(info) {
const placeholder= 'https://i.imgur.com/J5LVHEL.jpg';
let regex= /^(http:\/\/)/g 
this.image_url= info.imageLinks ? info.imageLinks.smallThumbnail.replace(regex, 'https://'): placeholder;
this.title= info.tile ? info.tile : 'Title Unknown';
this.author= info.authors ? info.authors[0] : 'Author Unknown';
this.description= info.description ? info.description : 'Sorry, no description available.'
}

function newSearch(request, response){
  response.render('pages/index')
}

function searchBooks(request, response){
  let url = 'https://www.googleapis.com/books/v1/volumes?q='

  if (request.body.search[1] === 'title'){
    url += `intitle:${request.body.search[0]}`;
  }
  if (request.body.search[1] === 'author'){
    url += `inauthor:${request.body.search[0]}`;
  }
  superagent.get(url)
    .then(apiResponse.body.items.map(bookResult => new Book (bookResult.volumeInfo)))
    .then(results => response.render ('pages/searches/show', { searchResults: results }))
    .catch(error => handleError(error, response));



  } 


  function handleError(error, response){
    response.render ('pages/error', { error: error })
  }

app.listen(PORT, () => {
    console.log(`App is on PORT: ${PORT}`);
  })