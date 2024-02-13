const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
	{
		'_id': new ObjectId('65ca0ce60326f75a33a44cfc'),
		'name': 'Samet',
		'surname': 'Yılmaz',
		'email': 'samet.yilmaz@gmail.com',
		'password': 'bc2b2bf60e58513241322821f0baf3b8',
		'gender': 1,
		'age': 24,
		'health': {
			'weight': 90.2,
			'height': 178,
			'fat_rate': 25
		},
		'roles': [ 1 ],
		'is_removed': false
	},
	{
		'_id': new ObjectId('65cb29eac574a310963cb732'),
		'name': 'Hakan',
		'surname': 'Dinçtürk',
		'email': 'hakan.dnc@gmail.com',
		'password': 'bc2b2bf60e58513241322821f0baf3b8',
		'gender': 1,
		'age': 24,
		'health': {
			'weight': 80.2,
			'height': 177,
			'fat_rate': 20
		},
		'roles': [ 2 ],
		'is_removed': false
	},
	{
		'_id': new ObjectId('65ca0ce60326f75a33a44d00'),
		'name': 'Ünal Burak',
		'surname': 'Ünsal',
		'email': 'burak.unsal@gmail.com',
		'password': 'bc2b2bf60e58513241322821f0baf3b8',
		'gender': 1,
		'age': 23,
		'health': {
			'weight': 85.7,
			'height': 181,
			'fat_rate': 20
		},
		'excercies': [
			new ObjectId('65c9fdab9754578fd3b7efb9'),
			new ObjectId('65c9fdab9754578fd3b7efba'),
			new ObjectId('65c9fdab9754578fd3b7efbc'),
			new ObjectId('65c9fdab9754578fd3b7efbe'),
			new ObjectId('65c9fdab9754578fd3b7efc0'),
			new ObjectId('65c9fdab9754578fd3b7efc2'),
			new ObjectId('65c9fdab9754578fd3b7efc4'),
			new ObjectId('65c9fdab9754578fd3b7efc5')
		],
		'roles': [ 3 ],
		'is_removed': false
	}
];