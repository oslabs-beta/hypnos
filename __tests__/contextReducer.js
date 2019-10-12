import { reducer, initialState } from '../client/Context';
import * as types from '../client/Constants/actionTypes';

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

  describe('action type tests', () => {
    let mockPayload = {};
    describe('RUN_QUERY case', () => {
      beforeAll(() => {
        mockPayload = {
          newAPIKey: '',
          newEndpont: 'https://api.tvmaze.com/',
          newHeadersKey: '',
          query: {
            definitions: [{}],
            kind: 'Document',
            loc: {
              end: 237,
              source: {},
              start: 0
            }
          },
          queryResultObject: 'show',
          ranQueryTab: '1',
          type: types.RUN_QUERY
        };
      });
      it('queryGQLError, endpointFromDB, historyTextValue should always be empty strings', () => {
        reducer(state, mockPayload);
        expect(state.queryGQLError).toBe('');
        expect(state.endpointFromDB).toBe('');
        expect(state.historyTextValue).toBe('');
      });
    });
  });
});
