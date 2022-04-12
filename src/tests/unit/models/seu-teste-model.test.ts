import { expect } from "chai";
import Sinon from "sinon";
import CarModel from "../../../models/carModel";
import { mockCars } from '../mocks/carsMock';

describe('CarModel', () => {
  let carModel = new CarModel();

  describe('#read', () => {
    before(() => {
      Sinon.stub(carModel.model, 'find').resolves(mockCars);
    });

    after(() => {
      Sinon.restore();
    })

    it('retorna uma lisa de perfis', async () => {
      const profiles = await carModel.read();
      expect(profiles).to.be.deep.equal(mockCars);
    });
  });

  describe('#readOne', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findOne').resolves(mockCars[0]);
    });

    after(() => {
      Sinon.restore();
    })

    it('retorna uma lisa de perfis', async () => {
      const profile = await carModel.readOne(mockCars[0]._id);
      expect(profile).to.be.deep.equal(mockCars[0]);
    });
  });

  describe('#create', () => {
    before(() => {
      Sinon.stub(carModel.model, 'create').resolves(mockCars[0]);
    });

    after(() => {
      Sinon.restore();
    })

    it('retorna o perfil criado', async () => {
      const profile = await carModel.create(mockCars[0]);
      expect(profile).to.be.deep.equal(mockCars[0]);
    });
  });

  describe('#update', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findOneAndUpdate').resolves(mockCars[0]);
    });

    after(() => {
      Sinon.restore();
    });

    it('atualiza o perfil e retorna o perfil atualizado', async () => {
      const profileUpdated = await carModel.update(mockCars[0]._id, mockCars[0]);
      expect(profileUpdated).to.be.deep.equal(mockCars[0]);
    })
  });

  describe('#delete', () => {
    before(() => {
      Sinon.stub(carModel.model, 'findOneAndDelete').resolves(mockCars[0]);
    });

    after(() => {
      Sinon.restore();
    });

    it('remove o perfil e retorna o perfil removido', async () => {
      const profileDeleted = await carModel.delete(mockCars[0]._id);
      expect(profileDeleted).to.be.deep.equal(mockCars[0]);
    })
  })
})