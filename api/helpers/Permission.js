import db from '../src/db';
const mongoose = require('mongoose');
import Language from '../src/language/index';
const ObjectId = mongoose.Types.ObjectId;

class PermissionHelper {

	static checkPermission(requiredPermission) {

		return async (req, res, next) => {
			const { lang } = req.decoded;
			const { user } = req.session;
			const userPermissions = await db.get().model('users').aggregate([
				{
					$match: {
						_id: new ObjectId(user._id)
					}
				},
				{
					$lookup: {
						from: 'roles',
						localField: 'roles',
						foreignField: 'type',
						as: 'role'
					}
				},
				{
					$unwind: '$role'
				},
				{
					$unwind: '$role.permissions'
				},
				{
					$match: {
						'role.permissions': requiredPermission
					}
				}
			]);
			if (userPermissions.length === 0) {
				return res.status(403).json({
					type: false,
					message: Language[ lang ].Permission.permissionDenied
				});
			}
			next();
		};
	}

}

export default PermissionHelper;