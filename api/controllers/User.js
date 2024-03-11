import UserService from '../services/User';
import Helpers from '../helpers/Helpers';
import ResponseEnum from '../src/enum/Response';

/**
 * @typedef update
 * @property {string} name
 * @property {string} surname
 * @property {string} password
 * @property {string} gender
 * @property {string} age
 * @property {health.model} health
 * @property {Array} exercises
 */

/**
 * @typedef excerciseCreate
 * @property {Array} exercises
 */

class User {

	/**
	 * @swagger
	 * @route POST /user/{id}
	 * @group user - Post operation about user update
	 * @summary endpoint for adding a user update
	 * @param {update.model} body.body.required
	 * @returns {object} 200 - An array of  user update info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async update(req, res) {
		try {
			const result = await UserService.update(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

	static async getAll(req, res) {
		try {
			const result = await UserService.getAll(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

	static async getTrainers(req, res) {
		try {
			const result = await UserService.getTrainers(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

	static async getAthletes(req, res) {
		try {
			const result = await UserService.getAthletes(req);
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
	 * @route POST /user/excerciseCreate/{id}
	 * @group user - Post operation about user excercise Create
	 * @summary endpoint for adding a user excercise Create
	 * @param {excerciseCreate.model} body.body.required
	 * @returns {object} 200 - An array of  user excerciseCreate info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async excerciseCreate(req, res) {
		try {
			const result = await UserService.excerciseCreate(req);
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
	 * @route POST /user/selfExcerciseCreate
	 * @group user - Post operation about user self excercise Create
	 * @summary endpoint for adding a user self excercise Create
	 * @param {excerciseCreate.model} body.body.required
	 * @returns {object} 200 - An array of  user self excerciseCreate info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async selfExcerciseCreate(req, res) {
		try {
			const result = await UserService.selfExcerciseCreate(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

	static async getExcercises(req, res) {
		try {
			const result = await UserService.getExcercises(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

	static async get(req, res) {
		try {
			const result = await UserService.get(req);
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
	 * @route POST /user/exerciseDelete/{exercise_id}
	 * @group user - Post operation about user  excercise delete
	 * @summary endpoint for adding a user  excercise delete
	 * @returns {object} 200 - An array of  user  excercise delete info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async exerciseDelete(req, res) {
		try {
			const result = await UserService.exerciseDelete(req);
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

export default User;