import express from 'express';
import ProgressController from '../controllers/Progress';

const app = express();

app.post('/', ProgressController.create);
app.get('/getUser', ProgressController.get);
app.get('/getOneProgress/:exercise_id', ProgressController.getOneProgress);

module.exports = app;