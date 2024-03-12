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
 * @property {Array<string>} exercises
 */

/**
 * @typedef selfExcerciseCreate
 * @property {Array<string>} exercises
 */
/**
 * @typedef health
 * @property {integer} weight.required
 * @property {integer} height.required
 * @property {integer} fat_rate.required
 */
/**
 * @typedef trainerCreate
 * @property {string} name.required
 * @property {string} surname.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {integer} gender.required
 * @property {integer} age.required
 * @property {health.model} health.required
 */

class User {

	/**
	 * @swagger
	 * @route POST /user/{id}
	 * @group user - Post operation about user update
	 * @summary endpoint for adding a user update
	 * @param {integer} id.path.required
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

	/**
	 * @route GET /user
	 * @group user
	 * @summary get all Users
	 * @returns {object} 200 - An array of all users info
	 * @returns {Errors} 500 - Internal server error
	 */

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

	/**
	 * @route GET /user/getTrainers
	 * @group user
	 * @summary get all trainers
	 * @returns {object} 200 - An array of all trainers info
	 * @returns {Errors} 500 - Internal server error
	 */

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

	/**
	 * @route GET /user/getAthletes
	 * @group user
	 * @summary get all athletes
	 * @returns {object} 200 - An array of all athletes info
	 * @returns {Errors} 500 - Internal server error
	 */

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
	 * @param {integer} id.path.required
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
	 * @param {selfExcerciseCreate.model} body.body.required
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

	/**
	 * @route GET /user/getExcercises
	 * @group user
	 * @summary get all User excercises
	 * @returns {object} 200 - An array of all user exercises info
	 * @returns {Errors} 500 - Internal server error
	 */

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

	/**
	 * @route GET /user/{id}
	 * @group user
	 * @summary get  Users
	 * @param {integer} id.path.required
	 * @returns {object} 200 - An array of all user info
	 * @returns {Errors} 500 - Internal server error
	 */

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
	 * @param {integer} exercise_id.path.required
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

	/**
	 * @swagger
	 * @route POST /user/delete/{id}
	 * @group user - Post operation about user delete
	 * @param {integer} id.path.required
	 * @summary endpoint for adding a user delete
	 * @returns {object} 200 - An array of user delete info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async delete(req, res) {
		try {
			const result = await UserService.delete(req);
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
	 * @route POST /user/trainerCreate
	 * @group user - Post operation about trainerCreate
	 * @summary endpoint for adding a trainerCreate
	 * @param {trainerCreate.model} body.body.required
	 * @returns {object} 200 - An array of  trainerCreate info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async trainerCreate(req, res) {
		try {
			const result = await UserService.trainerCreate(req);
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