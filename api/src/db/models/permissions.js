import mongoose from 'mongoose';

const { Schema } = mongoose;

const permissionsSchema = new Schema({
	name: { type: String, required: true },
	type: { type: Number, required: true },
	is_removed: { type: Boolean, default: false, required: true }
}, { timestamps: true }, { collection: 'permissions' });

module.exports = permissionsSchema;
