import AuthService from '../services/Auth';
import Helpers from '../helpers/Helpers';
import ResponseEnum from '../src/enum/Response';

/**
 * @typedef login
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef health
 * @property {integer} weight.required
 * @property {integer} height.required
 * @property {integer} fat_rate.required
 */
/**
 * @typedef register
 * @property {string} name.required
 * @property {string} surname.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {integer} gender.required
 * @property {integer} age.required
 * @property {health.model} health.required
 */

class Auth {

	/**
	 * @swagger
	 * @route POST /auth/register
	 * @group auth - Post operation about register
	 * @summary endpoint for adding a login
	 * @param {register.model} body.body.required
	 * @returns {object} 200 - An array of  login info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async register(req, res) {
		try {
			const result = await AuthService.register(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

	/**
	 * @swagger
	 * @route POST /auth/login
	 * @group auth - Post operation about login
	 * @summary endpoint for adding a login
	 * @param {login.model} body.body.required
	 * @returns {object} 200 - An array of  login info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async login(req, res) {
		try {
			const result = await AuthService.login(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

}

export default Auth;