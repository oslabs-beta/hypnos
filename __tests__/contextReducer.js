import { reducer, initialState } from '../client/Context';

describe('React Context reducer tests', () => {
  let state;

  beforeEach(() => {
    state = { ...initialState };
  });

  describe('default state', () => {
    it("reducer should return same state when there's no type property in action parameter", () => {
      expect(reducer(state, {})).toBe(state);
    });
    it('reducer should return same state when given unknown action type', () => {
      expect(reducer(state, { action: 'test', payload: 'test' })).toBe(state);
    });
  });

  describe('')
});
