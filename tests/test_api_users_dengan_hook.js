const chai = require('chai');
chai.use(require('chai-json-schema'))
const expect = require('chai').expect;
const { it } = require('mocha');
const api = require('../api_kuncie/api.js');
const dataTest = require('../data/data_user.js');
const dataTestJSON = require('../data/data_user.json');
const dataSchema = require('../schema/schema_get_user.js');

describe('API GET USER LIST - API GET {{base_url}}/api/bootcamp/users dengan Hooks', async () => {
    let idUser = '';

    before( async () => {
        console.log('INI DI EKSEKUSI YA');

        // TODO: Lakukan create User
        const response = await api.createUser('DHONY HULA HULA');
        expect(response.status).to.equal(200);

        console.log(response.body);

        idUser = response.body.id;
    });

    beforeEach(() => {
        console.log('INI DI EKSEKUSI SEBANYAK IT NYA TAPI SESAAT SEBELUM IT NYA DI EXEC');
    });

    afterEach(() => {
        console.log('INI DI EKSEKUSI SEBANYAK IT NYA TAPI SESAAT SETELAH IT NYA DI EXEC');
    });
    
    it('Test apakah fungsi API Get User List berjalan dengan baik dimana data user yang baru saya buat itu ada', async () => {
        
        // TODO: Panggil Get User List
        const response = await api.getUserList();
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

    it('Test apakah struktur JSON Schema yang diberikan oleh Get User List itu sesuai dengan schema yang ditetapkan', async () => {
        
        // TODO: Panggil Get User List
        const response = await api.getUserList();
        expect(response.status).to.equal(200);

        // assertion terhadap schema yang ditetapkan
        for(let index = 0; index < response.body.data.length; index++) {
            expect(response.body.data[index]).to.be.jsonSchema(dataSchema.schemaGetUsers);

        }
        
    });

});


