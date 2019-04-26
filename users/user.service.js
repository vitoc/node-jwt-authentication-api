const config = require('config.json');
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./tokens');
const jwt_decode = require('jwt-decode');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }
];

module.exports = {
    authenticate,
    authenticateWithState,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function authenticateWithState({ state }) {
    let idToken = localStorage.getItem(state);
    if (idToken) {
        let decodedToken = jwt_decode(idToken);
        localStorage.removeItem(state);
        return {
            username: decodedToken.unique_name,
            firstName: decodedToken.given_name,
            lastName: decodedToken.family_name,
            token: jwt.sign({ sub: decodedToken.oid }, config.secret)
        }

    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}
