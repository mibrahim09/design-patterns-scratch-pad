import { MementoTestImplementation } from '../src/patterns/memento/MementoTestImplementation';

describe('Memento Runner', () => {
  it('should run memento', () => {
    const mementoImpl = new MementoTestImplementation();
    mementoImpl.runImpl();
    expect({}).toEqual({});
  });
});
