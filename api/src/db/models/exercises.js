import mongoose from 'mongoose';

const { Schema } = mongoose;

const exercisesSchema = new Schema({
	name: { type: String, required: true },
	area: { type: String, required: true },
	sets: { type: Number, required: true },
	repetetions: { type: Number, required: true },
	rest_period: { type: Number, required: true },
	is_removed: { type: Boolean, default: false, required: true }
}, { timestamps: true }, { collection: 'exercises' });

module.exports = exercisesSchema;
