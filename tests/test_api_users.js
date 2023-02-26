const expect = require('chai').expect;
const { it } = require('mocha');
const api = require('../api_kuncie/api.js');
const dataTest = require('../data/data_user.js');
const dataTestJSON = require('../data/data_user.json');

describe('API GET USER LIST - API GET {{base_url}}/api/bootcamp/users', async () => {
    
    it('Test apakah fungsi API Get User List berjalan ditandai dengan data Herdian Chandra muncul', async () => {
        const response = await api.getUserList();

        const resultFilter = response.body.data.filter((element) => {
            return element.name === 'Herdian Chandra';
        });

        // const resultFilter = response.body.data.filter(function(data){
        //     return data.name === 'Herdian Chandra';
        // });

        expect(response.status).to.equal(200, 'Halo ini response status nya tidak 200');
        expect(resultFilter.length).to.greaterThan(0, 'Tidak ada data dengan nama Herdian Chandra');
    });

    it('@brew - Test apakah fungsi API Get User List berjalan dengan baik dimana data user yang baru saya buat itu ada', async () => {
        // TODO: Lakukan create User
        let response = await api.createUser('DHONY HULA HULA');
        expect(response.status).to.equal(200);

        console.log(response.body);

        const idUser = response.body.id;

        // TODO: Panggil Get User List
        response = await api.getUserList();
        expect(response.status).to.equal(200);

        // TODO Tipe 1: Cek menggunakan mata atas data dari create user muncul di Get User List 
        const resultFilter = response.body.data.filter((element) => {
            return element.id === idUser;
        });

        console.log(resultFilter);
        expect(resultFilter.length).to.greaterThan(0, 'Tidak ada data yang anda buat');
        expect(resultFilter[0].name).to.equal('DHONY HULA HULA');
        expect(resultFilter[0].id).to.equal(idUser);

        // TODO Tipe 2: Cek menggunakan mata atas data dari create user muncul di Get User List 
        const hasil = [];
        for (let index = 0; index < response.body.data.length; index++) {
            if (response.body.data[index].id === idUser) {
                hasil.push(response.body.data[index]);
            }
            
        };

        console.log(hasil);
        expect(hasil.length).to.greaterThan(0, 'Tidak ada data yang anda buat');
        expect(resultFilter[0].name).to.equal('DHONY HULA HULA');
        expect(resultFilter[0].id).to.equal(idUser);

        // TODO Tipe 3: Cek menggunakan mata atas data dari create user muncul di Get User List 
        expect(response.body.data).to.deep.include(resultFilter[0]);
    });

    it('@test - Test apakah fungsi API Create User menggunakan variasi data - name nya kosong', async () => {
        let bodyData = dataTest.dataUser();
        bodyData.name = "";

        const response = await api.createUserModel2(bodyData);
        expect(response.status).to.equal(400, 'Halo ini response status nya tidak 400');
    });

    it('@test - Test apakah fungsi API Create User menggunakan variasi data - phone number nya kosong', async () => {

        let bodyData = dataTest.dataUser();
        bodyData.phone_number = "";

        const response = await api.createUserModel2(bodyData);
        expect(response.status).to.equal(400, 'Halo ini response status nya tidak 400');

    });

    it('@test - Test apakah fungsi API Create User menggunakan variasi data - point diisi nya huruf', async () => {

        let bodyData = dataTest.dataUser();
        bodyData.point = "AHAHAHAHHA";

        const response = await api.createUserModel2(bodyData);
        expect(response.status).to.equal(400, 'Halo ini response status nya tidak 400');

    });
});


