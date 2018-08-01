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
      .end((error, res) => {
        if(error) done();

        console.log(res.error.text);
        console.log(res.body);
        done();
      });
  });

  after((done) => {
    db.any('TRUNCATE  $1:name, $2:name CASCADE', ['users', 'entries'])
      .then(() => done())
      .catch(() => done());
  });

  describe('Create new user', () => {

    const newUser = {
      firstname: 'victor',
      lastname: 'onwuzor',
      email: 'onwuzorvictor@outlook.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    it("should Create new user and return a token", (done) => {
      chai.request(app)
        .post(`${baseUrl}/users/signup`)
        .send(newUser)
        .end((error, res) => {
          if(error) done(error);

          expect(res).to.have.status(201);
          expect(res).to.be.header;
          done();
        });
    });
  });

  describe('Login users', () => {

    let loginUser = {
      email: newUser.email,
      password: newUser.password
    }

    it("should Log In user and return a web token", (done) => {
      chai.request(app)
        .post(`${baseUrl}/users/login`)
        .send(loginUser)
        .end((error, res) => {
          if(error) done();

          expect(res).to.have.status(200);
          expect(res).to.be.header;
          done();
        })
    });
  });
})