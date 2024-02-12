import mongoose from 'mongoose';

const { Schema } = mongoose;

const usersSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	gender: { type: Number, required: true },
	age: { type: Number, required: true },
	health: {
		type: {
			weight: { type: Number, required: true },
			height: { type: Number, required: true },
			fat_rate: { type: Number, required: true }
		}, required: true
	},
	excercies: [ { type: Schema.Types.ObjectId, ref: 'excercies' } ],
	roles: [ { type: Schema.Types.ObjectId, ref: 'roles', required: true } ],
	is_removed: { type: Boolean, default: false, required: true }
}, { timestamps: true }, { collection: 'users' });

module.exports = usersSchema;