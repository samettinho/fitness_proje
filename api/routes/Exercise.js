import express from 'express';
import ExcerciseController from '../controllers/Exercise';
import PermissionHelper from '../helpers/Permission';
import PermissionEnum from '../src/enum/Permissions';

const app = express();

app.post('/', PermissionHelper.checkPermission(PermissionEnum.EXERCISE_MANAGEMENT), ExcerciseController.create);
app.get('/', PermissionHelper.checkPermission(PermissionEnum.PROGRAM_LIST), ExcerciseController.getAll);

module.exports = app;