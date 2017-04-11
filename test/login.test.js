let chai = require('chai');
var expect = require('chai').expect
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('/Login Tests', () => {
    it('Server is running', (done) => {
        chai.request('http://localhost:8080')
            .get('/')
            .then((res) => {
                    done();
                },
                (err) => {
                    done(err);
                })
    });


});