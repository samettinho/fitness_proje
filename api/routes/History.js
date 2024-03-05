import express from 'express';
import HistoryController from '../controllers/History';
import PermissionHelper from '../helpers/Permission';
import PermissionEnum from '../src/enum/Permissions';

const app = express();

app.get('/', HistoryController.getAll);

module.exports = app;