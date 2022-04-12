import { Request, Response } from 'express';
import GenericService from '../services/GenericService';

export interface RequestWithBody<T> extends Request {
  body: T,
}

export type ResponseError = {
  error: unknown;
};

const NOT_FOUND = 'Object not found';

export default class GenericController<T> {
  constructor(public service: GenericService<T>) { }

  public async read(_req: Request, res: Response<T[]>): Promise<typeof res> {
    const data = await this.service.read();
    return res.status(200).json(data);
  }

  public async readOne(
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    const data = await this.service.readOne(req.params.id);

    if (!data) return res.status(404).json({ error: NOT_FOUND });

    return res.status(200).json(data);
  }

  public async create(
    req: RequestWithBody<T>,
    res: Response<T>,
  ): Promise<typeof res> {
    const data = await this.service.create(req.body);
    return res.status(201).json(data);
  }

  public async update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    const data = await this.service.update(req.params.id, req.body);

    if (!data) return res.status(404).json({ error: NOT_FOUND });

    return res.status(200).json(data);
  }

  public async delete(
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> {
    const data = await this.service.delete(req.params.id);

    if (!data) return res.status(404).json({ error: NOT_FOUND });

    return res.status(204).json(data);
  }
}