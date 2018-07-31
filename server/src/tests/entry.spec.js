import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../database';
import app from '../app';

chai.use(chaiHttp);
const baseUrl = '/api/v1';

describe('Entry', () => {

  const newUser = {
    firstname: 'john',
    lastname: 'doe',
    email: 'johndoe@outlook.com',
    password: 'password123',
    confirmPassword: 'password123'
  };

  let jwt;

  let entryData;

  before((done) => {
    chai.request(app)
      .post(`${baseUrl}/users/signup`)
      .send(newUser)
      .end((error, res) => {
        if(error) done();

        console.log(res.error.text);
        console.log(res.body);

        jwt = res.body;

        done();
      });
  });

  after((done) => {
    db.any('TRUNCATE  $1:name, $2:name CASCADE', ['users', 'entries'])
      .then(() => done())
      .catch(() => done());
  });

  describe('POST /entries', () => {
    const newEntry = {
      title: 'play of all',
      body: 'He plays all time',
    };

    it('should CREATE new entry', (done) => {
      chai.request(app)
        .post(`${baseUrl}/entries`)
        .send(newEntry)
        .set('Authorization', `Bearer ${jwt}`)
        .end((error, res) => {
          if(error) done();

          entryData = res.body;

          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.have.property('title').eql('play of all');
          expect(res.body).to.have.property('body').eql('He plays all time');
          done();
        });
    });
  });

  describe('GET /entries', () => {
    it('should GET all entries', (done) => {
      chai.request(app)
        .get(`${baseUrl}/entries`)
        .set('Authorization', `Bearer ${jwt}`)
        .end((error, res) => {
          if (error) done(error);

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          done();
        });
    });
  });

  describe('GET /entries/:id', () => {

    it('should GET only ONE entry by id', (done) => {
      chai.request(app)
      .get(`${baseUrl}/entries/${entryData.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .end((error, res) => {
        if(error) done(error);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title').to.equal(entryData.title);
        expect(res.body).to.have.property('body').to.equal(entryData.body);
        expect(res.body).to.have.property('id').eql(entryData.id);
        expect(res.body).to.have.property('users_id').eql(entryData.users_id);
        done();
      })
    });
  });


  describe('DELETE /entries/:id', () => {
    it('should DELETE only ONE entry by id', (done) => {
      chai.request(app)
      .delete(`${baseUrl}/entries/${entryData.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .end((error, res) => {
        if(error) done(error);

        expect(res).to.have.status(200);
        done();
      });
    });
  });

});
