const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./tokens');

// routes
router.post('/', receive);

module.exports = router;

function receive(req, res, next) {
    localStorage.setItem(req.body.state, req.body.id_token);
    res.redirect('http://localhost:8080/login');
}
