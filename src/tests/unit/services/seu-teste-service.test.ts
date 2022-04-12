import { expect } from "chai";
import Sinon from "sinon";
import CarService from "../../../services/carService";
import { mockCars } from '../mocks/carsMock';

describe('carService', () => {
  let carService = new CarService();

  describe('#read', () => {
    before(() => {
      Sinon.stub(carService.model, 'read').resolves(mockCars);
    });

    after(() => {
      Sinon.restore();
    })

    it('retorna uma lista de perfis', async () => {
      const profiles = await carService.read();
      expect(profiles).to.be.deep.equal(mockCars);
    });
  });

  describe('#create', () => {
    before(() => {
      Sinon.stub(carService.model, 'create').resolves(mockCars[0]);
    });

    after(() => {
      Sinon.restore();
    })

    it('retorna o perfil criado', async () => {
      const profile = await carService.create(mockCars[0]);
      expect(profile).to.be.deep.equal(mockCars[0]);
    });
  });

  describe('#readOne', () => {
    before(() => {
      Sinon.stub(carService.model, 'readOne').resolves(mockCars[0]);
    });

    after(() => {
      Sinon.restore();
    })

    it('retorna um perfil', async () => {
      const profile = await carService.readOne(mockCars[0]._id);
      expect(profile).to.be.deep.equal(mockCars[0]);
    });
  });

  describe('#update', () => {
    before(() => {
      Sinon.stub(carService.model, 'update').resolves(mockCars[0]);
    });

    after(() => {
      Sinon.restore();
    })

    it('retorna o perfil atualizado', async () => {
      const profile = await carService.update(mockCars[0]._id, mockCars[0]);
      expect(profile).to.be.deep.equal(mockCars[0]);
    });
  });

  describe('#delete', () => {
    before(() => {
      Sinon.stub(carService.model, 'delete').resolves(mockCars[0]);
    });

    after(() => {
      Sinon.restore();
    })

    it('retorna o perfil removido', async () => {
      const profile = await carService.delete(mockCars[0]._id);
      expect(profile).to.be.deep.equal(mockCars[0]);
    });
  });
})