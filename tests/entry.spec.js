import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import uniqid from 'uniqid';
import app from '../src/app';
import Entry from './../src/api/models/Entry';

chai.use(chaiHttp);
let baseUrl = '/api/v1';

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
      const id = uniqid();
      const newEntry = {id: id, title: 'play of all', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1};
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

    describe("GET /entries/:id", () => {
      const id = uniqid();
      const newEntry = {id: id, title: 'play of all', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1};
      it("should GET only ONE entry by id", (done) => {
        Entry.create(newEntry)
        .then(entry => {
          chai.request(app)
          .get(`${baseUrl}/entries/${entry.id}`)
          .end((error, res) => {
            if(error) done(error);

            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('title').eql(entry.title);
            expect(res.body).to.have.property('body').eql(entry.body);
            expect(res.body).to.have.property('feature_image').eql('http://image.jpg');
            expect(res.body).to.have.property('status').eql(1);
            expect(res.body).to.have.property('id').eql(entry.id);
            done();
          });
        });

      });
    });

    describe("PUT /entries/:id", () => {
      const id = uniqid();
      const newEntry = {id: id, title: 'play of all', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1};
      const updatedEntry = {id: id, title: 'play for love', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1};
      it("should UPDATE an entry given the id", (done) => {
        Entry.create(newEntry)
        .then(entry => {
          chai.request(app)
          .put(`${baseUrl}/entries/${entry.id}`)
          .send(updatedEntry)
          .end((error, res) => {
            if(error) done(error);

            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('title').eql('play for love');
            expect(res.body).to.have.property('feature_image').eql('http://image.jpg');
            expect(res.body).to.have.property('id').eql(entry.id);
            done();
          });
        });
      });
    });

  });
});