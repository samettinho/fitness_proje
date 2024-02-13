import express from 'express';
import UserController from '../controllers/User';
import PermissionHelper from '../helpers/Permission';
import PermissionEnum from '../src/enum/Permissions';

const app = express();

app.post('/:id', PermissionHelper.checkPermission(PermissionEnum.USER_UPDATE), UserController.update);
app.get('/', PermissionHelper.checkPermission(PermissionEnum.USER_LIST), UserController.getAll);
app.get('/trainers', PermissionHelper.checkPermission(PermissionEnum.TRAINER_LIST), UserController.getTrainers);
app.get('/athletes', PermissionHelper.checkPermission(PermissionEnum.ATHLETE_LIST), UserController.getAthletes);

module.exports = app;