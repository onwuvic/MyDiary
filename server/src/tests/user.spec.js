import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../database';
import app from '../app';

chai.use(chaiHttp);
const baseUrl = '/api/v1';

describe('User', () => {
  const newUser = {
    firstname: 'john',
    lastname: 'doe',
    email: 'johndoe@outlook.com',
    password: 'password123',
    confirmPassword: 'password123'
  };

  before((done) => {
    chai.request(app)
      .post(`${baseUrl}/users/signup`)
      .send(newUser)
      .end((error) => {
        if (error) done();

        done();
      });
  });

  after((done) => {
    db.any('TRUNCATE  $1:name, $2:name CASCADE', ['users', 'entries'])
      .then(() => done())
      .catch(() => done());
  });

  /* eslint-disable no-unused-expressions */
  describe('Create new user', () => {
    const newUserCreate = {
      firstname: 'victor',
      lastname: 'onwuzor',
      email: 'onwuzorvictor@outlook.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    it('should Create new user and return a token', (done) => {
      chai.request(app)
        .post(`${baseUrl}/users/signup`)
        .send(newUserCreate)
        .end((error, res) => {
          if (error) done(error);

          expect(res).to.have.status(201);
          expect(res.body).to.be.header;
          expect(res.body).to.have.property('token').to.be.a('string');
          expect(res.body.data).to.have.property('firstname').eql('victor');
          expect(res.body.data).to.have.property('lastname').eql('onwuzor');
          expect(res.body.data).to.have.property('email').eql('onwuzorvictor@outlook.com');
          expect(res.body).to.have.property('status').eql('success');
          expect(res.body).to.have.property('message').eql('Successfully signup');
          done();
        });
    });
  });

  describe('Login users', () => {
    const loginUser = {
      email: newUser.email,
      password: newUser.password
    };

    it('should Log In user and return a web token', (done) => {
      chai.request(app)
        .post(`${baseUrl}/users/login`)
        .send(loginUser)
        .end((error, res) => {
          if (error) done();

          expect(res).to.have.status(200);
          expect(res.body).to.be.header;
          expect(res.body.data).to.have.property('firstname').eql('john');
          expect(res.body.data).to.have.property('lastname').eql('doe');
          expect(res.body.data).to.have.property('email').eql('johndoe@outlook.com');
          expect(res.body).to.have.property('token').to.be.a('string');
          expect(res.body).to.have.property('status').eql('success');
          expect(res.body).to.have.property('message').eql('Successfully login');
          done();
        });
    });
  });
});
