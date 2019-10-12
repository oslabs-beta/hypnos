import { reducer, initialState } from '../client/Context';
import * as types from '../client/Constants/actionTypes';
import * as errorResponse from '../client/Constants/errors/errorResponseStrings';

describe('React Context reducer tests', () => {
  // console.log('reducer is: ', reducer);
  let state;
  let newState;

  beforeEach(() => {
    state = { ...initialState };
  });

  describe('default state', () => {
    it("reducer should return same state when there's no type property in action parameter", () => {
      expect(reducer(state, {})).toBe(state);
    });
    it('reducer should return same state when given unknown action type', () => {
      expect(reducer(state, { type: 'test', payload: 'test' })).toBe(state);
    });
  });

  describe('action type tests', () => {
    const mockPayload = {
      newAPIKey: '',
      newEndpoint: 'https://api.tvmaze.com/',
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

    describe('RUN_QUERY case', () => {
      beforeAll(() => {
        newState = reducer(state, mockPayload);
      });

      it('queryGQLError, endpointFromDB, historyTextValue should always be empty strings', () => {
        expect(newState.queryGQLError).toBe('');
        expect(newState.endpointFromDB).toBe('');
        expect(newState.historyTextValue).toBe('');
      });

      it("expect queryResultObject to be 'show'", () => {
        expect(newState.queryResultObject).toBe('show');
      });

      it('expect headersKey to be empty string', () => {
        expect(newState.headersKey).toBe('');
      });

      it('expect apiKey to be empty string', () => {
        expect(newState.apiKey).toBe('');
      });

      it('expect query property to contain shallow copy of action query & tab from which query was run', () => {
        // newState = reducer(state, mockPayload);
        expect(newState.query.query).toEqual(mockPayload.query);
        expect(newState.query.ranQueryTab).toBe(mockPayload.ranQueryTab);
      });

      it('expect endpointHistory at index 1 to be changed to what is in payload', () => {
        expect(newState.endpointHistory[mockPayload.ranQueryTab]).toBe(mockPayload.newEndpoint);
      });
    });

    describe('RESET_STATE case', () => {
      beforeAll(() => {
        // run a query on tab '1'
        newState = reducer(state, mockPayload);
        // change
        // mockPayload.ranQueryTab = '2';

        // run a new query from a new tab
        newState = reducer(newState, { ...mockPayload, ranQueryTab: '2' });
        // clean up
        // mockPayload.ranQueryTab = '1';
        // reset on the secondary tab
        newState = reducer(newState, { type: types.RESET_STATE, currentTab: '2' });
      });

      it('state outside of endpointHistory for everything but current tab should match initial state version', () => {
        expect(newState.query).toEqual(initialState.query);
        expect(newState.queryResultObject).toBe(initialState.queryResultObject);
        expect(newState.queryGQLError).toBe(initialState.queryGQLError);
        expect(newState.endpoint).toBe(initialState.endpoint);
        expect(newState.historyTextValue).toBe(initialState.historyTextValue);
        expect(newState.historyIdx).toBe(initialState.historyIdx);
        expect(newState.headersKey).toBe(initialState.headersKey);
        expect(newState.apiKey).toBe(initialState.apiKey);
        expect(newState.endpointFromDB).toBe(initialState.endpointFromDB);
        expect(newState.endpointHistory[mockPayload.ranQueryTab]).toBe(mockPayload.newEndpoint);
        expect(newState.endpointHistory['2']).toBe(initialState.endpoint);
      });
    });

    describe('GQL_ERROR case', () => {
      beforeAll(() => {
        newState = reducer(state, mockPayload);
        newState = reducer(newState, {
          type: types.GQL_ERROR,
          gqlError: errorResponse.queryMethodError
        });
      });
      it('query object should have errored version', () => {
        expect(newState.query).toEqual({
          query: '',
          ranQueryTab: -1
        });
      });
      it('expect queryResultObject and historyTextValue to be empty strings', () => {
        expect(newState.queryResultObject).toBe('');
        expect(newState.historyTextValue).toBe('');
      });
      it('expect queryGQLError to match error message from payload', () => {
        expect(newState.queryGQLError).toBe(errorResponse.queryMethodError);
      });
    });
  });
});
