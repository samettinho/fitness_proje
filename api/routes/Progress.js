import express from 'express';
import ProgressController from '../controllers/Progress';

const app = express();

app.post('/', ProgressController.create);
app.get('/getUser', ProgressController.get);

module.exports = app;