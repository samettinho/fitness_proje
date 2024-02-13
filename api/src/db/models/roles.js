import mongoose from 'mongoose';

const { Schema } = mongoose;

const rolesSchema = new Schema({
	name: { type: String, required: true },
	permissions: { type: [ Number ] },
	type: { type: Number, required: true },
	is_removed: { type: Boolean, default: false, required: true }
}, { timestamps: true }, { collection: 'roles' });

module.exports = rolesSchema;
