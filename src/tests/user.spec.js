import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../database';
import app from '../app';

chai.use(chaiHttp);
const baseUrl = '/api/v1';

describe('User', () => {
  beforeEach((done) => {
    db.any('TRUNCATE  $1:name, $2:name CASCADE', ['users', 'entries'])
      .then(() => done())
      .catch(() => done());
  });

  describe('POST /users/signup', () => {
    const newUser = {firstname: 'victor', lastname: 'onwuzor', email: 'onwuzorvictor@outlook.co', password: 'password123'};
    it("should get a 201 status code", (done) => {
      chai.request(app)
        .post(`${baseUrl}/users/signup`)
        .send(newUser)
        .end((error, res) => {
          if(error) done(error);

          expect(res).to.have.status(201);
          expect(res).to.be.header;
          done();
        })
    })
  })
})