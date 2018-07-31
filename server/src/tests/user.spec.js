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

  describe('POST /users/signup', () => {

    const newUser = {
      firstname: 'victor',
      lastname: 'onwuzor',
      email: 'onwuzorvictor@outlook.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    it("should get a 201 status code and auth header", (done) => {
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

  describe('Post /users/login', () => {

    let loginUser = {
      email: newUser.email,
      password: newUser.password
    }

    it("should login user in and return a web token", (done) => {
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