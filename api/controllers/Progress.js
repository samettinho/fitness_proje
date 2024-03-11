import ProgressService from '../services/Progress';
import Helpers from '../helpers/Helpers';
import ResponseEnum from '../src/enum/Response';

/**
 * @typedef create
 * @property {string} exercise_id.required
 */

class Progress {

	/**
	 * @swagger
	 * @route POST /progress
	 * @group progress - Post operation about progress create
	 * @summary endpoint for adding a progress create
	 * @param {create.model} body.body.required
	 * @returns {object} 200 - An array of  progress create info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async create(req, res) {
		try {
			const result = await ProgressService.create(req);
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
	 * @route GET /progress/getUser
	 * @group progress
	 * @summary progress get user
	 * @returns {object} 200 - An array of  progress get user info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async get(req, res) {
		try {
			const result = await ProgressService.get(req);
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
	 * @route GET /progress/getOneProgress/{exercise_id}
	 * @group progress
	 * @summary get One Progress
	 * @returns {object} 200 - An array of  get One Progress info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async getOneProgress(req, res) {
		try {
			const result = await ProgressService.getOneProgress(req);
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

export default Progress;