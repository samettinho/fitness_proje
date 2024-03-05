import db from '../src/db';
import Language from '../src/language/index';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

class History {

	static async getAll(req) {
		try {
			const { lang } = req.decoded;
			const user_id = req.decoded.user._id;
			console.log(user_id);
			const histories = await db.get().model('histories').aggregate([
				{
					$match: {
						user_id: new ObjectId(user_id),
						is_removed: false
					}
				},
				{
					$lookup: {
						from: 'exercises',
						localField: 'exercise_id',
						foreignField: '_id',
						as: 'exercise'
					}
				},
				{
					$unwind: '$exercise'
				},
				{
					$lookup: {
						from: 'users',
						localField: 'user_id',
						foreignField: '_id',
						as: 'user'
					}
				},
				{
					$unwind: '$user'
				},
				{
					$project: {
						name: '$user.name',
						surname: '$user.surname',
						age: '$user.age',
						weight: '$user.health.weight',
						height: '$user.health.height',
						fat_rate: '$user.health.fat_rate',
						exercise_name: '$exercise.name',
						exercise_month: '$end_of_month',
						exercise_day: '$end_of_day'
					}
				}
			]);
			return {
				type: true,
				message: Language[ lang ].History.historyListed,
				data: histories
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

export default History;