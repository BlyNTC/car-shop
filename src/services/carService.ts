import CarModel from '../models/carModel';
import { Car } from '../interfaces/CarInterface';
import GenericService from './GenericService';

export default class ProfileService extends GenericService<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }
}