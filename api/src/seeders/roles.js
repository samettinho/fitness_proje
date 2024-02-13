const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
	{
		'_id': new ObjectId('65ca22534544d8bb7c36d16f'),
		'name': 'Admin',
		'type': 1,
		'permissions': [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
	},
	{
		'_id': new ObjectId('65ca22534544d8bb7c36d170'),
		'name': 'Antrenör',
		'type': 2,
		'permissions': [ 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16 ]
	},
	{
		'_id': new ObjectId('65ca22534544d8bb7c36d171'),
		'name': 'Sporcu',
		'type': 3,
		'permissions': [ 2, 5, 6, 13, 15 ]
	}
];