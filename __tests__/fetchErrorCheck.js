import fetchErrorCheck from '../client/utils/queryInput/fetchErrorCheck';
import * as errorMessages from '../client/Constants/errors/errorStrings';

const mockDispatch = jest.fn();
const mockErrorObject = {
  locations: [{}],
  message: '',
  extensions: undefined,
  nodes: undefined,
  positions: [32],
  source: ``,
  stack: ''
};

describe('fetch error check for syntactically incorrect queries', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockErrorObject.message = '';
  });

  it('invoking fetchErrorCheck should invoke dispatch once', () => {
    mockErrorObject.message = errorMessages.queryMethodError;
    fetchErrorCheck(mockErrorObject, mockDispatch);
    expect(mockDispatch.mock.calls.length).toBe(1);
  });

  it('generic error not covered should throw error, and dispatch should be fired once', () => {
    mockErrorObject.message = errorMessages.queryMethodError;
    try {
      fetchErrorCheck(mockErrorObject, mockDispatch);
    } catch (e) {
      expect(e).toBe(typeof Error);
    } finally {
      expect(mockDispatch.mock.calls.length).toBe(1);
    }
  });
});
