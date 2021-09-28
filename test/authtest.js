const express = require('express');
const chai = require('chai'); //assertation library used for behaviour driven and test driven development
const request = require('supertest');
const { User } = require('../models/users');

const app = express();

let defaultUser = {
    name: "admin",
    password: "admin@123"
  };

describe('shoulkd return user', () => {
    beforeEach(done => {
        chai
          .request(app)
          .get("/users")
          .send(defaultUser)
          .end((err, res) => {
              res.should.have.status(200);
          })
    })
    beforeEach(done => {
        chai
         .request(app)
         .post("/login")
         .send(defaultUser)
         .end((err, res) => {
             token = res.body.token
             res.should.have.status(200);
             done();
         })
    })
    afterEach(done => {
        User.remove({}, err => {
            done();
        })
    })
    describe("Get users", () => {
        it("should fetch all users successfully", done => {
          chai
            .request(app)
            .set({ Authorization: `Bearer $token` })
            .get("/users")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("users");
              done();
            });
        });
      });


})