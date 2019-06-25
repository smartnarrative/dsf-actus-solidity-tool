const express = require('express');
const router = express.Router();
const dsfActusSolidityTool = require('./DSFActusSolidityTool');

const routes = () => {
    router.route('/tranche')
    .get((req, res) => {
      dsfActusSolidityTool.init();
      res.status(200).send({message: "OK"});
    });

    return router;
};

module.exports = routes;