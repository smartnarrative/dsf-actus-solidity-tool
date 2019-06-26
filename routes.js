const express = require('express');
const router = express.Router();
const dsfActusSolidityTool = require('./DSFActusSolidityTool');

const routes = () => {
    router.route('/')
    .get((req, res) => {
      dsfActusSolidityTool
      .init()
      .then(() => { console.log('done')});
      res.status(200).send({message: "OK"});
    });

    return router;
};

module.exports = routes;