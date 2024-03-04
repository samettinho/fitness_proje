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

describe('user services testing', () => {
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

	it('get all users', (done) => {
		agent
			.get('/user')
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

	it('get all trainers', (done) => {
		agent
			.get('/user/trainers')
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

	it('get all athletes', (done) => {
		agent
			.get('/user/athletes')
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

	it('user get exercises', (done) => {
		agent
			.get('/user/getExcercises')
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
				if (res.body.data[ 0 ].exercises.length !== 0) {
					res.body.should.have.property('type').equal(false);
					done();
				}
				res.body.should.have.property('type').equal(true);
				done();
			});
	});

	it('user exercise create', (done) => {
		const body = {
			'exercises': [ '65c9fdab9754578fd3b7efb9' ]
		};
		agent
			.post('/user/excerciseCreate/65ca0ce60326f75a33a44cfc')
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

	it('controlling the exercise created', (done) => {
		agent
			.get('/user/getExcercises')
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
				if (res.body.data[ 0 ].exercises.length === 0) {
					res.body.should.have.property('type').equal(false);
					done();
				}
				res.body.should.have.property('type').equal(true);
				done();
			});
	});

	it('user creating non-exercise', (done) => {
		const body = {
			'exercises': [ '65c9fdab9755578fd3b7efb9' ]
		};
		agent
			.post('/user/excerciseCreate/65ca0ce60326f75a33a44cfc')
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
				res.body.should.have.property('message').equal('Egzersiz bulunamadı');
				done();
			});
	});

	it('user update', (done) => {
		const body = {
			'health': {
				'weight': 93
			}
		};
		agent
			.post('/user/65ca0ce60326f75a33a44cfc')
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

	it('user update control', (done) => {
		agent
			.get('/user/65ca0ce60326f75a33a44cfc')
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
				if (res.body.data[ 0 ].health.weight !== 93) {
					res.body.should.have.property('type').equal(false);
					done();
				}
				res.body.should.have.property('type').equal(true);
				done();
			});
	});

	it('user self exercise create', (done) => {
		const body = {
			'exercises': [ '65c9fdab9754578fd3b7efbb', '65c9fdab9754578fd3b7efc5' ]
		};
		agent
			.post('/user/selfExcerciseCreate')
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

	it('controlling the self exercise created', (done) => {
		agent
			.get('/user/getExcercises')
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
				if (res.body.data[ 0 ].exercises.length !== 3) {
					res.body.should.have.property('type').equal(false);
					done();
				}
				res.body.should.have.property('type').equal(true);
				done();
			});
	});

});