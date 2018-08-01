import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../database';
import app from '../app';

chai.use(chaiHttp);
const baseUrl = '/api/v1';

describe('Entries', () => {
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
        if (error) done();

        jwt = res.body;

        done();
      });
  });

  after((done) => {
    db.any('TRUNCATE  $1:name, $2:name CASCADE', ['users', 'entries'])
      .then(() => done())
      .catch(() => done());
  });

  describe('Create new diary entry', () => {
    const newEntry = {
      title: 'play of all',
      body: 'He plays all time',
    };

    /* eslint-disable no-unused-expressions */
    it('should CREATE a new diary entry', (done) => {
      chai.request(app)
        .post(`${baseUrl}/entries`)
        .send(newEntry)
        .set('Authorization', `Bearer ${jwt.token}`)
        .end((error, res) => {
          if (error) done();

          entryData = res.body.data;

          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body.data).to.have.property('title').eql('play of all');
          expect(res.body.data).to.have.property('body').eql('He plays all time');
          done();
        });
    });
  });

  describe('Get all diary entries', () => {
    it('should GET all diary entries', (done) => {
      chai.request(app)
        .get(`${baseUrl}/entries`)
        .set('Authorization', `Bearer ${jwt.token}`)
        .end((error, res) => {
          if (error) done();

          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).to.have.lengthOf(1);
          done();
        });
    });
  });

  describe('Get one diary entry', () => {
    it('should GET only ONE entry by id', (done) => {
      chai.request(app)
        .get(`${baseUrl}/entries/${entryData.id}`)
        .set('Authorization', `Bearer ${jwt.token}`)
        .end((error, res) => {
          if (error) done();

          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('title').to.equal(entryData.title);
          expect(res.body.data).to.have.property('body').to.equal(entryData.body);
          expect(res.body.data).to.have.property('id').eql(entryData.id);
          expect(res.body.data).to.have.property('users_id').eql(entryData.users_id);
          done();
        });
    });
  });

  describe('Update one diary entry', () => {
    const updatedEntry = {
      title: 'we rocckkker',
      body: 'He plays all love',
    };

    it('should UPDATE an existing entries given the entry ID', (done) => {
      chai.request(app)
        .put(`${baseUrl}/entries/${entryData.id}`)
        .send(updatedEntry)
        .set('Authorization', `Bearer ${jwt.token}`)
        .end((error, res) => {
          if (error) done();

          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('title').to.equal('we rocckkker');
          expect(res.body.data).to.have.property('body').eql('He plays all love');
          expect(res.body.status).eql('success');
          done();
        });
    });
  });


  describe('Delete one diary entry', () => {
    it('should DELETE only ONE entry by id', (done) => {
      chai.request(app)
        .delete(`${baseUrl}/entries/${entryData.id}`)
        .set('Authorization', `Bearer ${jwt.token}`)
        .end((error, res) => {
          if (error) done();

          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
