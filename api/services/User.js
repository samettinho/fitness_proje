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

			const excerises = await db.get().model('exercises').find({
				_id: { $in: exerciseObjectIds }
			});
			if (excerises.length !== exercises.length) {
				return {
					type: false,
					message: Language[ lang ].Excercise.excerciseNotFound
				};
			}
			const userExcercises = await db.get().model('users').aggregate([
				{
					$match: {
						_id: user_id,
						is_removed: false
					}
				},
				{
					$project: {
						exercises: 1,
						hasAll: { $in: [ { $arrayElemAt: [ exerciseObjectIds, 0 ] }, '$exercises' ] }
					}
				}
			]);
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

			const excerises = await db.get().model('exercises').find({
				_id: { $in: exerciseObjectIds }
			});
			if (excerises.length !== exercises.length) {
				return {
					type: false,
					message: Language[ lang ].Excercise.exerciseNotFound
				};
			}
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

	static async get(req) {
		try {
			const { lang } = req.decoded;
			const user_id = new ObjectId(req.params.id);
			const users = await db.get().model('users').aggregate([
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

	static async exerciseDelete(req) {
		try {
			const { lang } = req.decoded;
			const exercise_id = new ObjectId(req.params.exercise_id);
			const user_id = new ObjectId(req.decoded.user._id);

			const exercise = await db.get().model('users').aggregate([
				{
					$match: {
						_id: user_id
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
					$match: {
						'exercises._id': exercise_id
					}
				}
			]);
			if (exercise.length === 0) {
				return {
					type: false,
					message: Language[ lang ].User.exerciseNotFound
				};
			}
			const result = await db.get().model('users').updateOne({
				_id: user_id,
				is_removed: false
			}, {
				$pull: {
					exercises: exercise_id
				}
			});
			return {
				type: true,
				message: Language[ lang ].User.excerciseDelete,
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

	static async delete(req) {
		try {
			const { lang } = req.decoded;
			const user_id = new ObjectId(req.params.id);
			const result = await db.get().model('users').updateOne({
				_id: user_id,
				is_removed: false
			}, {
				$set: {
					is_removed: true
				}
			});
			return {
				type: true,
				message: Language[ lang ].User.userDeleted,
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

	static async trainerCreate(req) {
		try {
			const { lang } = req.decoded;
			const user = req.body;
			user.roles = [ Roles.TRAINER ];
			console.log(user);
			const result = await db.get().model('users').create(user);
			return {
				type: true,
				message: Language[ lang ].Auth.success,
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

}

export default User;