import { Router } from 'express';

import GenericController from '../controllers/genericController';
import { Car } from '../interfaces/CarInterface';
import CarClassService from '../services/carService';

import validateBody from '../middlewares/validateBody';
import validateId from '../middlewares/validateId';

const carService = new CarClassService();
const CarController = new GenericController<Car>(carService);

const carRouter = Router();

const carByIdPath = '/cars/:id';

carRouter
  .get('/cars', (req, res) => CarController.read(req, res))
  .get(
    carByIdPath,
    validateId,
    (req, res) => CarController.readOne(req, res),
  )
  .post(
    '/cars',
    validateBody,
    (req, res) => CarController.create(req, res),
  )
  .put(
    carByIdPath,
    validateBody,
    validateId,
    (req, res) => CarController.update(req, res),
  )
  .delete(
    carByIdPath,
    validateId,
    (req, res) => CarController.delete(req, res),
  );

export default carRouter;
