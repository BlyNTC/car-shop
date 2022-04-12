import { NextFunction, Request, Response } from 'express';

import { ResponseError } from '../controllers/genericController';

const idValidation = async (
  req: Request<{ id: string }>,
  res: Response<ResponseError>,
  next: NextFunction,
): Promise<typeof res | undefined> => {  
  const { id } = req.params;
  if (id.length !== 24) { 
    return res
      .status(400)
      .json({ error: 'Id must have 24 hexadecimal characters' }); 
  }
  next();
};

export default idValidation;