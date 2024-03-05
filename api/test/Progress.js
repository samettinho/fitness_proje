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

describe('progress services testing', () => {
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

	it('get user progress', (done) => {
		agent
			.get('/progress/getUser')
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

	it('user self progress create', (done) => {
		const body = {
			'exercise_id': '65c9fdab9754578fd3b7efbb'
		};
		agent
			.post('/progress')
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
				res.body.should.have.property('message').equal('İlerleme kaydedildi');
				done();
			});
	});

	it('user self progress create control', (done) => {
		agent
			.get('/progress/getOneProgress/65c9fdab9754578fd3b7efbb')
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
				res.body.data[ 0 ].should.have.property('completed_set').equal(1);
				done();
			});
	});

	it('user non - exercise progression', (done) => {
		const body = {
			'exercise_id': '65c9fdab7754578fd3b7efaa'
		};
		agent
			.post('/progress')
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
				res.body.should.have.property('message').equal('Kullanıcının egzersizi bulunamadı');
				done();
			});
	});

});