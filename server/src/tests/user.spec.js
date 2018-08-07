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
  describe('Create new user controller', () => {
    const newUserCreate = {
      firstname: 'victor',
      lastname: 'onwuzor',
      email: 'onwuzorvictor@outlook.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    const emptyUserInput = {
      firstname: '',
      lastname: '',
      email: 'onwuzorvictor@outlook.com',
      password: 'password123',
      confirmPassword: 'password123'
    }

    const oneWordUserInput = {
      firstname: 'e',
      lastname: 'u',
      email: 'onwuzorvictor@outlook.com',
      password: 'password123',
      confirmPassword: 'password123'
    }

    const lessPassword = {
      firstname: 'victor',
      lastname: 'onwuzor',
      email: 'onwuzorvictor@outlook.com',
      password: 'pass',
      confirmPassword: 'pass'
    }

    const wrongEmail = {
      firstname: 'victor',
      lastname: 'onwuzor',
      email: 'onwuzorvictoroutlook.com',
      password: 'password123',
      confirmPassword: 'password123'
    }

    describe('When given invalid input', () => {
      it('should NOT CREATE users when any of the input field is empty', () => {
        chai.request(app)
          .post(`${baseUrl}/users/signup`)
          .send(emptyUserInput)
          .end((error, res) => {
            if (error) done(error);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('All fields are required');
          });
      });

      it('should NOT CREATE users when any of the first and last name is less than two words', () => {
        chai.request(app)
          .post(`${baseUrl}/users/signup`)
          .send(oneWordUserInput)
          .end((error, res) => {
            if (error) done(error);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('First and Last Name should be more than one character');
          });
      });

      it('should NOT CREATE users when the email is not correct', () => {
        chai.request(app)
          .post(`${baseUrl}/users/signup`)
          .send(wrongEmail)
          .end((error, res) => {
            if (error) done(error);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('Invalid Email Address');
          });
      });

      it('should NOT CREATE users when the password is less than six character', () => {
        chai.request(app)
          .post(`${baseUrl}/users/signup`)
          .send(lessPassword)
          .end((error, res) => {
            if (error) done(error);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('Password is less than six character');
          });
      });
    });

    describe('When given valid input', () => {
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

      it('should NOT CREATE users when the users already exist', () => {
        chai.request(app)
          .post(`${baseUrl}/users/signup`)
          .send(newUserCreate)
          .end((error, res) => {
            if (error) done(error);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('User already exist');
          });
      });
    });
  });

  describe('Login users controller', () => {
    const loginUser = {
      email: newUser.email,
      password: newUser.password
    };

    const loginEmptyUser = {
      email: '',
      password: ''
    };

    const wrongUserEmail = {
      email: 'okwy@gmail.com',
      password: newUser.password
    };

    const wrongUserPassword = {
      email: newUser.email,
      password: 'passwhenda'
    };

    describe('When given an invalid input', () => {
      it('should NOT LOG IN users when the input fields are empty', () => {
        chai.request(app)
          .post(`${baseUrl}/users/login`)
          .send(loginEmptyUser)
          .end((error, res) => {
            if (error) done(error);

            expect(res).to.have.status(422);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('You must provide an email and a password.');
          });
      });

      it('should NOT LOG IN users when email address is not correct', () => {
        chai.request(app)
          .post(`${baseUrl}/users/login`)
          .send(wrongUserEmail)
          .end((error, res) => {
            if (error) done(error);

            expect(res).to.have.status(404);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('User not found, please sign up.');
          });
      });

      it('should NOT LOG IN users when password is not correct', () => {
        chai.request(app)
          .post(`${baseUrl}/users/login`)
          .send(wrongUserPassword)
          .end((error, res) => {
            if (error) done(error);

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('Invalid email and password.');
          });
      });
    });

    describe('When given an valid input', () => {
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
});
