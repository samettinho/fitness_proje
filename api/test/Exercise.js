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

describe('exercise services testing', () => {
	let agent = chai.request.agent(app);
	beforeEach((done) => {
		const body = {
			email: 'samet.yilmaz@gmail.com',
			password: '123456'
		};
		agent
			.post('/auth/login')
			.send(body)
			.then((res) => {
				res.should.have.status(200);
				done();
			});
	});

	it('get all exercises', (done) => {
		agent
			.get('/exercise')
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

	it(' exercise create', (done) => {
		const body = {
			'name': 'Dumbell Fly',
			'area': 'Göğüs',
			'sets': 3,
			'repetetions': 15,
			'rest_period': 45
		};
		agent
			.post('/exercise')
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

	it('wrong exercise create', (done) => {
		const body = {
			'name': 'Dumbell Fly',
			'area': 'Göğüs'
		};
		agent
			.post('/exercise')
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

});