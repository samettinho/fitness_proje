import UserService from '../services/User';
import Helpers from '../helpers/Helpers';
import ResponseEnum from '../src/enum/Response';

class User {

	static async update(req, res) {
		try {
			const result = await UserService.update(req);
			if (!result.type) {
				return res.json(Helpers.responseMessage(ResponseEnum.ERROR, result.message));
			}
			return res.json(Helpers.responseMessage(ResponseEnum.SUCCESS, result.message, result.data));
		}
		catch (error) {
			return res.json(Helpers.responseMessage(ResponseEnum.ERROR, error.message));
		}
	}

}

export default User;