import HistoryService from '../services/History';
import Helpers from '../helpers/Helpers';
import ResponseEnum from '../src/enum/Response';

class History {

	/**
	 * @route GET /history
	 * @group history
	 * @summary history get all
	 * @returns {object} 200 - An array of  history get all info
	 * @returns {Errors} 500 - Internal server error
	 */

	static async getAll(req, res) {
		try {
			const result = await HistoryService.getAll(req);
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

export default History;