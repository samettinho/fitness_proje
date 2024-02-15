import mongoose from 'mongoose';

const { Schema } = mongoose;

const programSchema = new Schema({
	exercise_id: { type: Schema.Types.ObjectId, ref: 'exercises', required: true },
	user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
	completed_set: { type: Number, required: true, default: 0 },
	completed_repetetion: { type: Number, required: true, default: 0 },
	is_removed: { type: Boolean, default: false, required: true }
}, { timestamps: true }, { collection: 'progresses' });

module.exports = programSchema;
