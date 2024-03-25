/* eslint-disable indent */
/* eslint-disable semi-spacing */

import moment from 'moment';
import db from '../src/db';
import Email from './Email';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

/* eslint-disable max-len */
class Helpers {

	static successMessage(message, data) {
		if (!data) {
			return {
				type: true,
				message: message
			};
		}
		return {
			type: true,
			message: message,
			data: data
		};
	}

	static errorMessage(message) {
		return {
			type: false,
			message: message
		};
	}

	static responseMessage(messageType, message, data) {
		switch (messageType) {
			case 'success':
				return this.successMessage(message, data);
			case 'error':
				return this.errorMessage(message);
			default:
				return this.errorMessage('error');
		}
	}

	static async checkDailyExercise(req, res, next) {
		try {
			const { user } = req.decoded;
			const id = new ObjectId(user._id);
			console.log('id', id);
			const today = moment();
			const day = today.format('DD');
			const month = today.format('MM');
			console.log('day', day);
			console.log('month', month);
			const athlete = await db.get().model('histories').aggregate([
				{
					$match: {
						user_id: id
					}
				}
			]);
			if (athlete.length === 0) {
				Email.sendtextMail(req.decoded, 'REMINDING');
			}
			next();
		}
		catch (error) {
			return {
				type: false,
				message: error.message
			};
		}
	}

}
export default Helpers;