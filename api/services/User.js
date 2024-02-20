import db from '../src/db';
import Language from '../src/language';
import mongoose from 'mongoose';
import Roles from '../src/enum/Role';
import e from 'cors';
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
			const users = await db.get().model('users').aggregate([
				{
					$match: {
						is_removed: false
					}
				},
				{
					$lookup: {
						from: 'exercises',
						localField: 'exercises',
						foreignField: '_id',
						as: 'exercises'
					}
				},
				{
					$unwind: '$exercises'
				},
				{
					$unwind: '$roles'
				}
			]);
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

	static async selfExcerciseCreate(req) {
		try {
			const { lang } = req.decoded;
			const exercises = req.body.exercises;
			const user_id = new ObjectId(req.session.user._id);
			const exerciseObjectIds = exercises.map(exerciseId => new ObjectId(exerciseId));

			const result = await db.get().model('users').updateOne({
				_id: user_id,
				is_removed: false
			}, {
				$addToSet: {
					exercises: { $each: exerciseObjectIds }
				}
			});

			for (const exerciseId of exercises) {
				let progress = await db.get().model('progresses').create({
					user_id: user_id,
					exercise_id: exerciseId
				});
			}
			return {
				type: true,
				message: Language[ lang ].User.excerciseCreate,
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

	static async excerciseCreate(req) {
		try {
			const { lang } = req.decoded;
			const exercises = req.body.exercises;
			const user_id = req.params.id;

			const exerciseObjectIds = exercises.map(exerciseId => new ObjectId(exerciseId));

			const result = await db.get().model('users').updateOne({
				_id: new ObjectId(user_id),
				is_removed: false
			}, {
				$addToSet: {
					exercises: { $each: exerciseObjectIds }
				}
			});
			for (const exerciseId of exercises) {
				let progress = await db.get().model('progresses').create({
					user_id: new ObjectId(user_id),
					exercise_id: exerciseId
				});
			}
			return {
				type: true,
				message: Language[ lang ].User.excerciseCreate,
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

	static async getExcercises(req) {
		try {
			const { lang } = req.decoded;

			const user_id = new ObjectId(req.decoded.user._id);

			const userExcercises = await db.get().model('users').aggregate([
				{
					$match: {
						_id: user_id,
						is_removed: false
					}
				},
				{
					$lookup: {
						from: 'exercises',
						localField: 'exercises',
						foreignField: '_id',
						as: 'exercises'
					}
				}
			]);

			return {
				type: true,
				message: Language[ lang ].User.excerciseListed,
				data: userExcercises
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