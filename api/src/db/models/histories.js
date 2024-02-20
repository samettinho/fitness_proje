import mongoose from 'mongoose';

const { Schema } = mongoose;

const historySchema = new Schema({
	exercise_id: { type: Schema.Types.ObjectId, ref: 'exercises', required: true },
	user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
	end_of_date: { type: Date, required: true, default: Date.now },
	is_removed: { type: Boolean, default: false, required: true }
}, { timestamps: true }, { collection: 'histories' });

module.exports = historySchema;