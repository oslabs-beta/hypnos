import { reducer, initialState } from '../client/Context.js';

describe('React Context reducer tests', () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  describe('default state', () => {
    it('reducer should return default state when given undefined action type', () => {
      expect(reducer(state, {})).toEqual(state);
    });
  });
});
