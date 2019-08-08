const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./tokens');
const config = require('config.json');
// routes
router.post('/', receive);

module.exports = router;

function receive(req, res, next) {
    const { frontendUrl } = config;
    localStorage.setItem(req.body.state, req.body.id_token);
    res.redirect(frontendUrl);
}
