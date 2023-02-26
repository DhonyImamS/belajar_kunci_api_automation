const httpLib = require('supertest');
const apKuncie = httpLib('https://api.kunciebootcampqa.com/api/bootcamp');

function getUserList() {
    return apKuncie
        .get('/users');
};

function createUser(namaUser) {
    return apKuncie
            .post('/users')
            .send({
                "name": namaUser,
                "phone_number": "1112223334440000",
                "address": "Automasi Address",
                "point": 500,
                "is_registered": true,
                "vehicles": [
                    {
                        "name": "Supra - Automasi",
                        "type": "Toyota - Automasi"
                    },
                    {
                        "name": "Mobilio - Automasi",
                        "type": "Honda - Automasi"
                    }
                ]
            });
};

function createUserModel2(bodyData) {
    return apKuncie
            .post('/users')
            .send(bodyData);
};

module.exports = {
    getUserList,
    createUser,
    createUserModel2
}