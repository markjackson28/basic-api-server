'use strict';

const express = require('express');

const { Pet } = require('../models/index');

const router = express.Router();

// Routes
router.get('/pet', getPet);
router.get('/pet/:id', getOnePet);
router.post('/pet', createPet);
router.put('/pet/:id', updatePet);
router.delete('/pet/:id', deletePet);

// Handlers 
async function getPet(req, res) {
  let allPets = await Pet.findAll();
  res.status(200).json(allPets);
}

async function getOnePet(req, res) {
  const id = parseInt(req.params.id);
  let pet = await Pet.findOne({ where: { id: id}});
  res.status(200).json(pet);
}

async function createPet(req, res) {
  let petData = req.body;
  let pet = await Pet.create(petData);
  res.status(200).json(pet);
}

async function updatePet(req, res) {
  const id = parseInt(req.params.id);
  const petData = req.body;
  let pet = await Pet.findOne({ where: { id: id }});
  let updatedPet = await pet.update(petData);
  res.status(200).json(updatedPet);
}

async function deletePet(req, res) {
  let id = parseInt(req.params.id);
  let deletedPet = await Pet.destroy({ where: { id: id }});
  res.status(200).json(deletedPet);
}

module.exports = router;
