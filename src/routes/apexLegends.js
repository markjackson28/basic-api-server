'use strict';

const express = require('express');

const { ApexLegend } = require('../models/index');

const router = express.Router();

// Routes
router.get('/apexlegend', getLegends);
router.get('/apexlegend/:id', getOneLegend);
router.post('/apexlegend', createLegend);
router.put('/apexlegend/:id', updateLegend);
router.delete('/apexlegend/:id', deleteLegend);

// Handlers 
async function getLegends(req, res) {
  let allLegends = await ApexLegend.findAll();
  res.status(200).json(allLegends);
}

async function getOneLegend(req, res) {
  const id = parseInt(req.params.id);
  let legend = await ApexLegend.findOne({ where: { id: id}});
  res.status(200).json(legend);
}

async function createLegend(req, res) {
  let legendData = req.body;
  let legend = await ApexLegend.create(legendData);
  res.status(200).json(legend);
}

async function updateLegend(req, res) {
  const id = parseInt(req.params.id);
  const legendData = req.body;
  let legend = await ApexLegend.findOne({ where: { id: id }});
  let updatedLegend = await legend.update(legendData);
  res.status(200).json(updatedLegend);
}

async function deleteLegend(req, res) {
  let id = parseInt(req.params.id);
  let deletedLegend = await ApexLegend.destroy({ where: { id: id }});
  res.status(200).json(deletedLegend);
}

module.exports = router;
