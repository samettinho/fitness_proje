/* eslint-disable multiline-comment-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { it } from 'mocha';

chai.use(chaiHttp);
chai.should();

describe('auth services testing', () => {
	let agent = chai.request.agent(app);
	it('login', (done) => {
		const body = {
			'email': 'samet.yilmaz@gmail.com',
			'password': '123456'
		};
		agent
			.post('/auth/login')
			.send(body)
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message',
					'data'
				);
				res.body.should.have.property('type').equal(true);
				done();
			});
	});

	it('wrong login', (done) => {
		const body = {
			'email': 'samet.yilmaz@gmail.com',
			'password': '12356'
		};
		agent
			.post('/auth/login')
			.send(body)
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message'
				);
				res.body.should.have.property('type').equal(false);
				done();
			});
	});

	it('register', (done) => {
		const body = {
			'name': 'Ali',
			'surname': 'Savaş',
			'email': 'ali.savas@gmail.com',
			'password': '123456',
			'gender': 1,
			'age': 28,
			'health': {
				'weight': 95.7,
				'height': 188,
				'fat_rate': 25
			},
			'exercises': [
			],
			'roles': [
				3
			]
		};
		agent
			.post('/auth/register')
			.send(body)
			.end((err, res) => {
				if (err) {
					done(err);
				}

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.keys(
					'type',
					'message',
					'data'
				);
				res.body.should.have.property('type').equal(true);
				done();
			});
	});
});