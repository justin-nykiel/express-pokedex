const express = require('express');
const router = express.Router();
const db = require("../models");
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  let pokemon
  db.pokemon.findAll().then((results)=>{
    pokemon = results
    res.render('pokemon/index.ejs', {pokemon});
  })
});
router.get('/:id', function(req, res) {
  // TODO: Get all records from the DB and render to view
  const pokemon = req.params.id
  
  const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'+pokemon;
  // Use request to call the API
  
  axios.get(pokemonUrl).then( function(apiResponse) {
    
    const poke = apiResponse.data;
    res.render('pokemon/deet.ejs', {poke});
  })
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon
  .create({
    name: req.body.name
  })
  res.redirect('/');
});


module.exports = router;
