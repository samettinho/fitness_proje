import db from '../src/db';
import Language from '../src/language';
import mongoose from 'mongoose';
import Roles from '../src/enum/Role';
const ObjectId = mongoose.Types.ObjectId;

class User {

	static async update(req) {
		try {
			const { lang } = req.decoded;
			const { body } = req;
			const user_id = new ObjectId(req.params.id);

			const result = await db.get().model('users').updateOne({
				_id: user_id,
				is_removed: false
			}, {
				$set: body
			});
			return {
				type: true,
				message: 'güncellendi',
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
			const users = await db.get().model('users').find({
				is_removed: false
			});
			return {
				type: true,
				message: Language[ lang ].User.userListed,
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

	static async getTrainers(req) {
		try {
			const { lang } = req.decoded;
			const trainers = await db.get().model('users').find({
				is_removed: false,
				roles: Roles.TRAINER
			});
			return {
				type: true,
				message: Language[ lang ].User.userListed,
				data: trainers
			};
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

	static async getAthletes(req) {
		try {
			const { lang } = req.decoded;
			const athletes = await db.get().model('users').find({
				is_removed: false,
				roles: Roles.ATHLETE
			});
			return {
				type: true,
				message: Language[ lang ].User.userListed,
				data: athletes
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

export default User;