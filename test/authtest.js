const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const { User } = require('../models/users');
const request = require('supertest');

const app = express();

chai.use(chaiHttp);

const agent = chai.request.agent(app);
// https://stackoverflow.com/questions/59858287/testing-jwt-authentication-using-mocha-and-chai

describe('User login', () => {
  it('should not be able to login if they have not registered', () => {
    request(app)
    .post('/login')
    .send({ phone_number: '0700000000', password: 'nope' })
    .expect(200)
    .then((res) => {
      expect(res.should.have.status(401));
    });
  });

  it('should be able to login', function(done) {
    this.timeout(0);
    request(app)
    .post('/login')
    .send({ phone_number: '0700000000', password: '123456789' })
    .expect(200)
    .then((res) => {
      expect(res.should.have.status(200));
    })
    done()

});


});

// login
