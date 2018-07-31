import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../database';
import app from '../app';

chai.use(chaiHttp);
const baseUrl = '/api/v1';

describe.only('Entry', () => {

  const newUser = {
    firstname: 'john',
    lastname: 'doe',
    email: 'johndoe@outlook.com',
    password: 'password123'
  };

  let jwt;

  before((done) => {
    chai.request(app)
      .post(`${baseUrl}/users/signup`)
      .send(newUser)
      .end((error, res) => {
        if(error) done();

        console.log(res.error.text);
        console.log(res);
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

  describe('GET /entries', () => {
    it('should GET all entries', (done) => {
      chai.request(app)
        .get(`${baseUrl}/entries`)
        .set('Authorization', `Bearer ${jwt}`)
        .end((error, res) => {
          if (error) done(error);

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(0);
          done();
        });
    });
  });

  describe('GET /entries/:id', () => {

    const newEntry = {
      title: 'play of all',
      body: 'He plays all time',
      feature_image: 'http://image4.jpg',
      users_id: 1
    };

    it('should GET only ONE entry by id', (done) => {

      db.one('INSERT INTO entries(title, body, feature_image, users_id)' +
      'VALUES(${title}, ${body}, ${feature_image}, ${users_id}) returning *', newEntry)
        .then((entry) => {
          chai.request(app)
          .get(`${baseUrl}/entries/${entry.id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .end((error, res) => {
            if(error) done(error);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('title').to.equal('play of all');
            expect(res.body).to.have.property('body').to.equal('He plays all time');
            expect(res.body).to.have.property('feature_image').to.equal('http://image4.jpg');
            expect(res.body).to.have.property('id').eql(entry.id);
            expect(res.body).to.have.property('users_id').eql(1);
            done();
          })
          done();
        })
        .catch(() => done())
    });
  });

  describe('DELETE /entries/:id', () => {

    const newEntry = {
      title: 'play of all',
      body: 'He plays all time',
      feature_image: 'http://image.jpg',
      users_id: 1
    };

    it('should DELETE only ONE entry by id', (done) => {

      db.one('INSERT INTO entries(title, body, feature_image, users_id)' +
      'VALUES(${title}, ${body}, ${feature_image}, ${users_id}) returning *', newEntry)
        .then((entry) => {
          chai.request(app)
          .delete(`${baseUrl}/entries/${entry.id}`)
          .set('Authorization', `Bearer ${jwt}`)
          .end((error, res) => {
            if(error) done(error);

            expect(res).to.have.status(200);
            done();
          })
          done();
        })
        .catch(() => done())
    });
  });

});

//     /* eslint-disable no-unused-expressions */
//     describe('POST /entries', () => {
//       const id = uniqid();
//       const newEntry = {
//         id, title: 'play of all', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1
//       };
//       it('should CREATE a new entry', (done) => {
//         chai.request(app)
//           .post(`${baseUrl}/entries`)
//           .send(newEntry)
//           .end((error, res) => {
//             if (error) done(error);

//             expect(res).to.have.status(201);
//             expect(res).to.be.json;
//             expect(res.body).to.have.property('title').eql('play of all');
//             expect(res.body).to.have.property('body').eql('He plays all time');
//             expect(res.body).to.have.property('feature_image').eql('http://image.jpg');
//             expect(res.body).to.have.property('status').eql(1);
//             done();
//           });
//       });
//     });

//     describe('GET /entries/:id', () => {
//       const id = uniqid();
//       const newEntry = {
//         id, title: 'play of all', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1
//       };
//       it('should GET only ONE entry by id', (done) => {
//         Entry.create(newEntry)
//           .then((entry) => {
//             chai.request(app)
//               .get(`${baseUrl}/entries/${entry.id}`)
//               .end((error, res) => {
//                 if (error) done(error);

//                 expect(res).to.have.status(200);
//                 expect(res).to.be.json;
//                 expect(res.body).to.have.property('title').eql(entry.title);
//                 expect(res.body).to.have.property('body').eql(entry.body);
//                 expect(res.body).to.have.property('feature_image').eql('http://image.jpg');
//                 expect(res.body).to.have.property('status').eql(1);
//                 expect(res.body).to.have.property('id').eql(entry.id);
//                 done();
//               });
//           });
//       });
//     });

//     describe('PUT /entries/:id', () => {
//       const id = uniqid();
//       const newEntry = {
//         id, title: 'play of all', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1
//       };
//       const updatedEntry = {
//         id, title: 'play for love', body: 'He plays all time', feature_image: 'http://image.jpg', status: 1
//       };
//       it('should UPDATE an entry given the id', (done) => {
//         Entry.create(newEntry)
//           .then((entry) => {
//             chai.request(app)
//               .put(`${baseUrl}/entries/${entry.id}`)
//               .send(updatedEntry)
//               .end((error, res) => {
//                 if (error) done(error);

//                 expect(res).to.have.status(200);
//                 expect(res).to.be.json;
//                 expect(res.body).to.have.property('title').eql('play for love');
//                 expect(res.body).to.have.property('feature_image').eql('http://image.jpg');
//                 expect(res.body).to.have.property('id').eql(entry.id);
//                 done();
//               });
//           });
//       });
//     });
//   });
// });
