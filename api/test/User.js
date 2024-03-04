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
});