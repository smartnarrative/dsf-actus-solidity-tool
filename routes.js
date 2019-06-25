const express = require('express');
const router = express.Router();

const routes = () => {
    router.route('/tranche')
    .get((req, res) => {
      res.status(200).send({message: "OK"});
    });

    return router;
};

module.exports = routes;