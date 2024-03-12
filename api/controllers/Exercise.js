import ExerciseService from '../services/Exercise';
import Helpers from '../helpers/Helpers';
import ResponseEnum from '../src/enum/Response';

/**
 * @typedef exerciseCreate
 * @property {string} name.required
 * @property {string} area.required
 * @property {integer} sets.required
 * @property {integer} repetetions.required
 * @property {integer} rest_period.required
 */
class Exercise {

	/**
	 * @swagger
	 * @route POST /exercise
	 * @group exercise - Post operation about exercise create
	 * @summary endpoint for adding a exercise create
	 * @param {exerciseCreate.model} body.body.required
	 * @returns {object} 200 - An array of  exercise create info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async create(req, res) {
		try {
			const result = await ExerciseService.create(req);
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
	 * @route GET /exercise
	 * @group exercise
	 * @summary exercise get all
	 * @returns {object} 200 - An array of  exercise get all info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async getAll(req, res) {
		try {
			const result = await ExerciseService.getAll(req);
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

export default Exercise;