/* eslint-env mocha */
import { expect } from 'chai';

global.VALUE = 100;

describe('Suite 1', () => {
  it('passes a simple test', () => {
    expect(true).to.equal(true);
  });
  it('global value is 0', () => {
    expect(VALUE).to.equal(0);
  });
})

describe('Suite 2', () => {
  const anotherPromiseGuaranteedToFail = async () => {
    return new Promise((resolve, reject) => {
      VALUE = -1; // GLOBAL VALUE IS MODIFIED ASYNCHRONOUSLY HERE
      try {
        throw new Error('failure');
      } catch (error) {
        reject(error);
      }
      resolve();
    });
  };

  // this before all hook is modifying the global value in an asynchronous way
  before(() => (
    new Promise((resolve, reject) => {
      resolve(0);
    }).then(() => {
      return anotherPromiseGuaranteedToFail();
    })
  ));

  it('passes a simple test', () => {
    expect(1).to.equal(1);
  });
})

describe('Suite 3', () => {
  it('global value is 0', () => {
    // fails since afterEach did not set the global value back to 0 after Suite 2
    expect(VALUE).to.equal(0);
  });
});

afterEach(() => {
  global.VALUE = 0;
});
