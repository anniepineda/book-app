'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
let ejs = require('ejs');

//Parse form data !!!important
app.use( express.urlencoded( {extended: true} ) );

require('dotenv').config();
app.use(cors());

app.use( express.static( './public') )


app.set('view engine', 'ejs');

app.get('/',(request, response) => {

  response.render('pages/index') 
}); 





app.post('/searches', searchBooks);


function Book(info) {
  const placeholder= 'https://i.imgur.com/J5LVHEL.jpg';
  let regex= /^(http:\/\/)/g 
  this.image_url= info.imageLinks ? info.imageLinks.smallThumbnail.replace(regex, 'https://'): placeholder;
  this.title= info.title ? info.title : 'Title Unknown';
  this.author= info.authors ? info.authors[0] : 'Author Unknown';
  this.description= info.description ? info.description : 'Sorry, no description available.'
}

// function newSearch(request, response) => {
//   response.render('pages/index')
// }


function searchBooks(request, response){

  let url = 'https://www.googleapis.com/books/v1/volumes?q='

  if (request.body.searchType === 'title'){
    url += `intitle:${request.body.searchField}`;
  }
  if (request.body.searchType === 'author'){
    url += `inauthor:${request.body.searchField}`;
  }

  //Get book info from API
  superagent.get(url)
    .then( apiResponse => {

      //api response is in JSON so we parse data into JS object
      let parsedData = JSON.parse(apiResponse.text);
      let booksArray = parsedData.items;      

      //build a bunch of book objets
      let parsedBookData = booksArray.map( (bookData) => {
        //Build new 
        return new Book (bookData.volumeInfo)
      })

      
      return parsedBookData;
    })
    .then(results => response.render ('pages/searches/show', { bookDataArray: results }))
    .catch(error => handleError(error, response));

  } 


  function handleError(error, response){
    response.render ('pages/error', { error: error })
  }

app.listen(PORT, () => {
    console.log(`App is on PORT: ${PORT}`);
  })






