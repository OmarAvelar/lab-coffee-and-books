const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');




router.get('/new', (req, res, next) => {
  res.render('new');
});

router.post('/new', (req, res, next) => {
  const places = {
      name: req.body.name,
      type: req.body.type,
      location: {
        type: 'Point',
        coordinates: [0,0]
      }
  };
  Place.create(places).then(res.redirect('/places/list'))
  .catch(err=>{
      console.log(err)
  })
});




router.get('/list', (req, res, next) => {
  Place.find()
  .then(places=>{
    res.render('list', {places});
  }).catch(err=>{
    console.log(err)
  })
});

router.get('/list/:id', (req, res, next) => {
  const {id} = req.params.id
  Place.findById(id)
  .then(place =>{
    res.render('detail', place)
  }).catch(err=>{
    console.log(err)
  })
});

module.exports = router;