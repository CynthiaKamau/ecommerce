const express = require('express');
const chai = require('chai'); //assertation library used for behaviour driven and test driven development
const request = require('supertest');

const app = express();

describe('Product api', () => {
    it('should return the specific product', () => {
        request(app)
        .get('/product/1')
        .send({})
        .expect(200)
        .then((res) => {
            expect(res.headers.location).to.be.eql('/product/1');
        })
    });
    it('should create a new product', () => {
        request(app)
        .get('/product')
        .send({})
        .expect(201)
        .then((res) => {
            expect(res.headers.location).to.be.eql('/product');
        })
    })
})