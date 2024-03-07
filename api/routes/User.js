/* eslint-disable max-len */
import express from 'express';
import UserController from '../controllers/User';
import PermissionHelper from '../helpers/Permission';
import PermissionEnum from '../src/enum/Permissions';

const app = express();

app.post('/selfExcerciseCreate', PermissionHelper.checkPermission(PermissionEnum.EXERCISE_MANAGEMENT), UserController.selfExcerciseCreate);
app.post('/exerciseDelete/:exercise_id', PermissionHelper.checkPermission(PermissionEnum.EXERCISE_MANAGEMENT), UserController.exerciseDelete);
app.get('/', PermissionHelper.checkPermission(PermissionEnum.USER_LIST), UserController.getAll);
app.get('/trainers', PermissionHelper.checkPermission(PermissionEnum.TRAINER_LIST), UserController.getTrainers);
app.get('/athletes', PermissionHelper.checkPermission(PermissionEnum.ATHLETE_LIST), UserController.getAthletes);
app.post('/excerciseCreate/:id', PermissionHelper.checkPermission(PermissionEnum.EXERCISE_MANAGEMENT), UserController.excerciseCreate);
app.get('/getExcercises', PermissionHelper.checkPermission(PermissionEnum.EXERCISE_MANAGEMENT), UserController.getExcercises);
app.post('/:id', PermissionHelper.checkPermission(PermissionEnum.USER_UPDATE), UserController.update);
app.get('/:id', PermissionHelper.checkPermission(PermissionEnum.USER_LIST), UserController.get);

module.exports = app;