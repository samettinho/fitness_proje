import express from 'express';
import UserController from '../controllers/User';

const app = express();

app.post('/:id', UserController.update);

module.exports = app;