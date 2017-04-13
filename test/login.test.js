let chai = require('chai');
var expect = require('chai').expect
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('/Login Tests', () => {
    var userData;
    it('Server is running and giving data', (done) => {
        chai.request('http://mockproject.duckdns.org:8080')
            .get('/users')
            .then((res) => {
                    expect(res.body).to.not.be.a('null');
                    userData = res.body;
                    (res.body).forEach(function(userData) {
                        expect(userData).to.have.property('id');
                        expect(userData).to.have.property('name');
                    });
                    done();
                },
                (err) => {
                    done(new Error('Server is not running'));
                })
    });
});