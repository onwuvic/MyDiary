import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

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
  });
});