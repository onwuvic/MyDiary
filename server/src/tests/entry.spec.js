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

  /* eslint-disable no-unused-expressions */
  describe('Create controller', () => {
    describe('When given invalid input', () => {
      const emptyContent = {
        title: '',
        body: '',
      };

      const lessThanSixCharacter = {
        title: 'long',
        body: 'long',
      }

      const correctEntry = {
        title: 'play of all',
        body: 'He plays all time',
      };

      it('should NOT CREATE a new diary when entry fields are empty', (done) => {
        chai.request(app)
          .post(`${baseUrl}/entries`)
          .send(emptyContent)
          .set('Authorization', `Bearer ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('All fields are required');
            done();
          });
      });

      it('should NOT CREATE a new diary when entry input characters are less than six', (done) => {
        chai.request(app)
          .post(`${baseUrl}/entries`)
          .send(lessThanSixCharacter)
          .set('Authorization', `Bearer ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('Title and diary content is too small');
            done();
          });
      });

      it('should NOT CREATE a new diary when there is no token', (done) => {
        chai.request(app)
          .post(`${baseUrl}/entries`)
          .send(correctEntry)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('No token provided');
            done();
          });
      });

      it('should NOT CREATE a new diary when token bearer is wrong', (done) => {
        chai.request(app)
          .post(`${baseUrl}/entries`)
          .send(correctEntry)
          .set('Authorization', `Bear ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('bearer not understood');
            done();
          });
      });

      it('should NOT CREATE a new diary when token is wrong', (done) => {
        chai.request(app)
          .post(`${baseUrl}/entries`)
          .send(correctEntry)
          .set('Authorization', `Bearer ueue783839.8383ijdd.8djdjn`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('Error authenticating, please login again');
            done();
          });
      });
    });

    describe('When given valid input', () => {
      const newEntry = {
        title: 'play of all',
        body: 'He plays all time',
      };

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
  });


  describe('Get all diary entries controller', () => {
    describe('When given invalid parameters', () => {
      it('should NOT GET all diary entries when there is no token', (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('No token provided');
            done();
          });
      });

      it('should NOT GET all diary entries when token bearer is wrong', (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries`)
          .set('Authorization', `Bear ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('bearer not understood');
            done();
          });
      });

      it('should NOT GET all diary entries when token is wrong', (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries`)
          .set('Authorization', `Bearer ueue783839.8383ijdd.8djdjn`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('Error authenticating, please login again');
            done();
          });
      });
    });

    describe('When given valid parameters', () => {
      it('should GET all diary entries', (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries`)
          .set('Authorization', `Bearer ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(200);
            expect(res.body.data).to.be.an('array');
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('success');
            expect(res.body).to.have.property('message').eql('successfully fetch all diary entries');
            done();
          });
      });
    });
  });


  describe('Get one diary entry controller', () => {
    describe('When given invalid parameters', () => {
      it('should NOT GET ONE entry by id when there is no token', (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries/${entryData.id}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('No token provided');
            done();
          });
      });

      it('should NOT GET ONE entry by id when token bearer is wrong', (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries/${entryData.id}`)
          .set('Authorization', `Bear ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('bearer not understood');
            done();
          });
      });

      it('should NOT GET ONE entry by id when token is wrong', (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries/${entryData.id}`)
          .set('Authorization', `Bearer ueue783839.8383ijdd.8djdjn`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('Error authenticating, please login again');
            done();
          });
      });

      it('should NOT GET only ONE entry by id when id is invalid', (done) => {
        chai.request(app)
          .get(`${baseUrl}/entries/50`)
          .set('Authorization', `Bearer ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(404);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('None of your diaries was found with this ID');
            done();
          });
      });
    });

    describe('When given valid parameters', () => {
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
  });

  describe('Update one diary entry controller', () => {
    const updatedEntry = {
      title: 'we rocckkker',
      body: 'He plays all love',
    };

    describe('When given invalid input', () => {
      const emptyContent = {
        title: '',
        body: '',
      };

      const lessThanSixCharacter = {
        title: 'long',
        body: 'long',
      }

      it('should NOT UPDATE an existing entries given the entry ID when entry fields are empty', (done) => {
        chai.request(app)
          .put(`${baseUrl}/entries/${entryData.id}`)
          .send(emptyContent)
          .set('Authorization', `Bearer ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('All fields are required');
            done();
          });
      });

      it('should NOT UPDATE an existing entries given the entry ID when entry input characters are less than six', (done) => {
        chai.request(app)
          .put(`${baseUrl}/entries/${entryData.id}`)
          .send(lessThanSixCharacter)
          .set('Authorization', `Bearer ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('Title and diary content is too small');
            done();
          });
      });

      it('should NOT UPDATE an existing entries given the entry ID when there is no token', (done) => {
        chai.request(app)
          .put(`${baseUrl}/entries/${entryData.id}`)
          .send(updatedEntry)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('No token provided');
            done();
          });
      });

      it('should NOT UPDATE an existing entries given the entry ID when token bearer is wrong', (done) => {
        chai.request(app)
          .put(`${baseUrl}/entries/${entryData.id}`)
          .send(updatedEntry)
          .set('Authorization', `Bear ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('bearer not understood');
            done();
          });
      });

      it('should NOT UPDATE an existing entries given the entry ID when token is wrong', (done) => {
        chai.request(app)
          .put(`${baseUrl}/entries/${entryData.id}`)
          .send(updatedEntry)
          .set('Authorization', `Bearer ueue783839.8383ijdd.8djdjn`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('Error authenticating, please login again');
            done();
          });
      });
    });

    describe('When given valid input', () => {
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
  });


  describe('Delete one diary entry controller', () => {

    describe('When given invalid parameter', () => {
      it('should NOT DELETE entry by id when there is no token', (done) => {
        chai.request(app)
          .delete(`${baseUrl}/entries/${entryData.id}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('No token provided');
            done();
          });
      });

      it('should NOT DELETE entry by id when token bearer is wrong', (done) => {
        chai.request(app)
          .delete(`${baseUrl}/entries/${entryData.id}`)
          .set('Authorization', `Bear ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('bearer not understood');
            done();
          });
      });

      it('should NOT DELETE entry by id when token is wrong', (done) => {
        chai.request(app)
          .delete(`${baseUrl}/entries/${entryData.id}`)
          .set('Authorization', `Bearer ueue783839.8383ijdd.8djdjn`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('status').eql('error');
            expect(res.body).to.have.property('message').eql('Error authenticating, please login again');
            done();
          });
      });

      it('should NOT DELETE entry by id when id is invalid', (done) => {
        chai.request(app)
          .delete(`${baseUrl}/entries/50`)
          .set('Authorization', `Bearer ${jwt.token}`)
          .end((error, res) => {
            if (error) done();

            expect(res).to.have.status(404);
            expect(res.body).to.have.property('status').to.equal('error');
            expect(res.body).to.have.property('message').to.equal('None of your diaries was found with this ID');
            done();
          });
      });
    });

    describe('When given valid input', () => {
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
});
