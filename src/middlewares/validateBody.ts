import { NextFunction, Response } from 'express';
import { CarSchema, Car } from '../interfaces/CarInterface';
import { 
  RequestWithBody, ResponseError } from '../controllers/genericController';

const bodyValidation = async (
  req: RequestWithBody<Car>,
  res: Response<ResponseError>,
  next: NextFunction,
): Promise<typeof res | undefined> => {
  console.log('BODY DA REQ', req.body);
  if (!req.body) { 
    return res.status(400);
  }
  const parsed = CarSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.message });
  }
  next();
};

export default bodyValidation;