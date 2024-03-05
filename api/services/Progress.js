import db from '../src/db';
import Language from '../src/language';
import mongoose from 'mongoose';
import moment from 'moment';
const ObjectId = mongoose.Types.ObjectId;

class Progress {

	static async create(req) {
		try {
			const { lang } = req.decoded;
			const { body } = req;
			const user_id = new ObjectId(req.decoded.user._id);
			const exercise_id = new ObjectId(body.exercise_id);
			body.user_id = user_id;

			const today = moment();
			const day = today.format('DD');
			const month = today.format('MM');

			//egzersizin kullanıcıya tanımlı olup olmadığını kontrol et ve bilgileri getir
			const user = await db.get().model('users').aggregate([
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
				},
				{
					$project: {
						_id: 1,
						name: 1,
						surname: 1,
						gender: 1,
						age: 1,
						weight: '$health.weight',
						height: '$health.height',
						fat_rate: '$health.fat_rate',
						exercise_name: '$exercises.name',
						exercise_area: '$exercises.area',
						exercise_sets: '$exercises.sets',
						exercise_repetetions: '$exercises.repetetions',
						exercise_rest_period: '$exercises.rest_period'
					}
				}
			]);
			if (user.length === 0) {
				return {
					type: false,
					message: Language[ lang ].User.exerciseNotFound
				};
			}
			//egzersiz ilerlemesinin olup olmadığını kontrol et ve listele
			const progress = await db.get().model('progresses').aggregate([
				{
					$match: {
						user_id: user_id,
						exercise_id: exercise_id
					}
				},
				{
					$project: {
						_id: 1,
						exercise_id: 1,
						user_id: 1,
						completed_set: 1,
						completed_repetetion: 1
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
						_id: 1,
						user_name: '$user.name',
						completed_set: 1,
						completed_repetetion: 1,
						exercise_name: '$exercise.name',
						exercise_area: '$exercise.area',
						exercise_sets: '$exercise.sets',
						exercise_repetetions: '$exercise.repetetions',
						exercise_rest_period: '$exercise.rest_period'
					}
				}
			]);
			//egzersiz ilerlemesi yoksa oluştur
			if (progress.length === 0) {
				const progressCreate = await db.get().model('progresses').create(body);
				return {
					type: true,
					message: Language[ lang ].Progress.created,
					data: user
				};
			}
			//egzersiz bugün bitirilmiş mi kontrol et
			const history = await db.get().model('histories').findOne({
				user_id: user_id,
				exercise_id: exercise_id,
				end_of_month: month,
				end_of_day: day
			});
			if (history) {
				//egzersiz bugün bitirilmiş olduğu için set sayısını sıfırla
				const progressUpdate = await db.get().model('progresses').updateOne({
					user_id: user_id,
					exercise_id: exercise_id
				}, {
					$set: {
						completed_set: 0
					}
				});
				return {
					type: false,
					message: Language[ lang ].Progress.exerciseTodayCompleted
				};
			}
			//egzersiz ilerlemesi varsa ve set sayısı tamamlanmamışsa güncelle
			if (user[ 0 ].exercise_sets > progress[ 0 ].completed_set) {
				const result = await db.get().model('progresses').updateOne({
					user_id: user_id,
					exercise_id: exercise_id
				}, {
					//bir arttır
					$inc: { completed_set: 1 }
				});
				return {
					type: true,
					message: Language[ lang ].Progress.created,
					data: result
				};
			}
			//egzersiz bitirilmişse geçmiş koleksiyonuna kaydet
			const historyCreate = await db.get().model('histories').create({
				exercise_id: exercise_id,
				user_id: user_id,
				end_of_month: month,
				end_of_day: day
			});
			return {
				type: true,
				message: Language[ lang ].Progress.exerciseFinished,
				data: historyCreate
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
			const user_id = new ObjectId(req.decoded.user._id);
			const progress = await db.get().model('progresses').aggregate([
				{
					$match: {
						user_id: user_id
					}
				},
				{
					$project: {
						_id: 1,
						exercise_id: 1,
						user_id: 1,
						completed_set: 1,
						completed_repetetion: 1,
						createdAt: 1
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
						_id: 1,
						user_name: '$user.name',
						completed_set: 1,
						completed_repetetion: 1,
						exercise_name: '$exercise.name',
						exercise_area: '$exercise.area',
						exercise_sets: '$exercise.sets',
						exercise_repetetions: '$exercise.repetetions',
						exercise_rest_period: '$exercise.rest_period',
						createdAt: 1
					}
				}
			]);
			progress.map((item) => {
				item.createdAt = moment(item.createdAt).add(3, 'hours');
			});
			if (progress.length === 0) {
				return {
					type: false,
					message: Language[ lang ].Progress.notFound
				};
			}
			return {
				type: true,
				message: Language[ lang ].Progress.get,
				data: progress
			};

		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

	static async getOne(req) {
		try {
			const { lang } = req.decoded;
			const user_id = new ObjectId(req.decoded.user._id);
			const progress = await db.get().model('progresses').aggregate([
				{
					$match: {
						user_id: user_id
					}
				},
				{
					$project: {
						_id: 1,
						exercise_id: 1,
						user_id: 1,
						completed_set: 1,
						completed_repetetion: 1,
						createdAt: 1
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
						_id: 1,
						user_name: '$user.name',
						completed_set: 1,
						completed_repetetion: 1,
						exercise_name: '$exercise.name',
						exercise_area: '$exercise.area',
						exercise_sets: '$exercise.sets',
						exercise_repetetions: '$exercise.repetetions',
						exercise_rest_period: '$exercise.rest_period',
						createdAt: 1
					}
				}
			]);
			progress.map((item) => {
				item.createdAt = moment(item.createdAt).add(3, 'hours');
			});
			if (progress.length === 0) {
				return {
					type: false,
					message: Language[ lang ].Progress.notFound
				};
			}
			return {
				type: true,
				message: Language[ lang ].Progress.get,
				data: progress
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

export default Progress;