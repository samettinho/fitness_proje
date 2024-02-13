import express from 'express';
import UserController from '../controllers/User';
import PermissionHelper from '../helpers/Permission';
import PermissionEnum from '../src/enum/Permissions';

const app = express();

app.post('/:id', PermissionHelper.checkPermission(PermissionEnum.USER_UPDATE), UserController.update);

module.exports = app;