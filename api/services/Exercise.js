import db from '../src/db';
import dotenv from 'dotenv/config';
import Language from '../src/language/index';

class Excercise {

	static async create(req) {
		try {
			const { lang } = req.decoded;
			const { body } = req;
			const result = await db.get().model('exercises').create(body);
			return {
				type: true,
				message: Language[ lang ].Excercise.created,
				data: result
			};
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

	static async getAll(req) {
		try {
			const { lang } = req.decoded;
			const users = await db.get().model('exercises').find({
				is_removed: false
			});
			return {
				type: true,
				message: Language[ lang ].Excercise.excerciseListed,
				data: users
			};
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

}

export default Excercise;