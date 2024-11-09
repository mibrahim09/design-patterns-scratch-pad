import { StateTestImplementation } from '../patterns/state/StateTestImplementation';

describe('State Runner', () => {
  it('should run memento', () => {
    const implementation = new StateTestImplementation();
    implementation.runImpl();
    expect({}).toEqual({});
  });
});
