import { model as M, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import GenericModel from './GenericModel';

const carSchema = new Schema({
  model: String,
  year: Number,
  color: String,
  status: Boolean || undefined,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class CarModel extends GenericModel<Car> {
  constructor(public model = M('CarShop', carSchema)) {
    super(model);
  }
}
