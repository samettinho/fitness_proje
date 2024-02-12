import db from '../src/db';
import Language from '../src/language';
import mongoose from 'mongoose';

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

}

export default User;