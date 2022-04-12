// template para criação dos testes de cobertura da camada de controller

import server from '../../../server';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import CarService from '../../../services/carService';
import GenericController from '../../../controllers/genericController';
import { Car } from '../../../interfaces/CarInterface';

const carService = new CarService();
const CarController = new GenericController<Car>(carService);

import { mockCars } from '../mocks/carsMock';
import CarModel from '../../../models/carModel';

chai.use(chaiHttp);

const { expect } = chai;
describe('carController', () => {
  describe('#read', () => {
    let carModel = new CarModel();
    before(async () => {
      sinon
        .stub(carModel.model, 'find')
        .resolves(mockCars);
    });

    after(()=>{
      sinon.restore();
    })
    
    it('testando se responde todas as listas', async () => {
      const res = await chai.request(server.getApp()).get('/cars');
      
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.eql(mockCars);
    });
    
    describe('#readOne', () => {
      let carModel = new CarModel();
      before(async () => {
        sinon
          .stub(carModel.model, 'findOne')
          .resolves(mockCars[0]);
      });
  
      after(()=>{
        sinon.restore();
      })

      it('testando se retorna o usuario encontrado', async () => {
        const res = await chai.request(server.getApp()).get('/cars/4edd40c86762e0fb12000003');
        
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.eql(mockCars[0]);
      });
  });

  describe('#readOne', () => {
    let carModel = new CarModel();
    before(async () => {
      sinon
        .stub(carModel.model, 'create')
        .resolves(mockCars[0]);
    });

    after(()=>{
      sinon.restore();
    })
    
    it('testando se retorna o usuario encontrado', async () => {
      const res = await (await chai.request(server.getApp()).post('/cars/').send(mockCars[0]));
      
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.eql(mockCars[0]);
    });
  });

  describe('#update', () => {
    let carModel = new CarModel();
    before(async () => {
      sinon
        .stub(carModel.model, 'findByIdAndUpdate')
        .resolves(mockCars[0]);
    });

    after(()=>{
      sinon.restore();
    })
    
    it('testando se retorna o usuario encontrado', async () => {
      const res = await (await chai.request(server.getApp())
        .put('/cars/'+mockCars[0]._id).send(mockCars[0]));
      
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.eql(mockCars[0]);
    });
  }); 

  describe('#update', () => {
    let carModel = new CarModel();
    before(async () => {
      sinon
        .stub(carModel.model, 'findByIdAndDelete')
        .resolves(mockCars[0]);
    });

    after(()=>{
      sinon.restore();
    })
    
    it('testando se retorna o usuario encontrado', async () => {
      const res = await (await chai.request(server.getApp())
        .delete('/cars/'+mockCars[0]._id).send(mockCars[0]));
      
      expect(res.status).to.be.equal(204);
      expect(res.body).to.be.eql({});
    });
  });
});

})
