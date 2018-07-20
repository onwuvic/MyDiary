import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import uniqid from 'uniqid';
import app from '../src/app';

chai.use(chaiHttp);
let baseUrl = '/api/v1';
let id = uniqid();
let newEntry = {id: id, title: 'play of all', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1};

describe("Entry", () => {
  describe("entries endpoints", () => {

    describe("GET /entries", () => {
      it("should GET all entries", (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries`)
          .end((error, res) => {
            if(error) done(error);

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(0);
            done();
          });
      });
    });

    describe("POST /entries", () => {
      it("should CREATE a new entry", (done) => {
        chai.request(app)
          .post(`${baseUrl}/entries`)
          .send(newEntry)
          .end((error, res) => {
            if(error) done(error);

            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.have.property('title').eql('play of all');
            expect(res.body).to.have.property('body').eql('He plays all time');
            expect(res.body).to.have.property('feature_image').eql('http://image.jpg');
            expect(res.body).to.have.property('status').eql(1);
            done();
          });
      });
    });

  });
});