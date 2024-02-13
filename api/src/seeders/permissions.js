const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
	{
		'name': 'Kulllanıcıları görüntüle',
		'type': 1
	},
	{
		'name': 'Antrenör görüntüle',
		'type': 2
	},
	{
		'name': 'Sporcu görüntüle',
		'type': 3
	},
	{
		'name': 'Kulllanıcıları ekle',
		'type': 4
	},
	{
		'name': 'Kulllanıcı sil',
		'type': 5
	},
	{
		'name': 'Kulllanıcı güncelle',
		'type': 6
	},
	{
		'name': 'Antrenör ekle',
		'type': 7
	},
	{
		'name': 'Antrenör sil',
		'type': 8
	},
	{
		'name': 'Antrenör güncelle',
		'type': 9
	},
	{
		'name': 'Sporcu ekle',
		'type': 10
	},
	{
		'name': 'Sporcu sil',
		'type': 11
	},
	{
		'name': 'Sporcu güncelle',
		'type': 12
	},
	{
		'name': 'Antrenman Programı Görüntüleme',
		'type': 13
	},
	{
		'name': 'Antrenman Programı Düzenleme',
		'type': 14
	},
	{
		'name': 'İlerleme Takibi',
		'type': 15
	},
	{
		'name': 'Egzersiz Veritabanı Yönetimi',
		'type': 16
	}
];