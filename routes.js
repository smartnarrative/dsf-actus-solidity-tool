const express = require('express');
const router = express.Router();
const dsfActusSolidityTool = require('./DSFActusSolidityTool');
const wrap = require('./wrap');

const routes = () => {
    router.route('/tranche')
    .get(wrap(async (req, res) => {
      dsfActusSolidityTool
      .init()
      .then((schedule) => { 
        res.status(200).send(JSON.stringify(schedule));
      });
    }));

    return router;
};

module.exports = routes;