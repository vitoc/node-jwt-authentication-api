const express = require('express');
const router = express.Router();
const PouchDB = require('pouchdb');
const db = new PouchDB('tokens');

// routes
router.post('/', receive);

module.exports = router;

function receive(req, res, next) {
    console.log(req.body);
    db.put({
        _id: req.body.state,
        token: req.body.id_token
    });
    res.redirect('http://localhost:8080/login');
}
