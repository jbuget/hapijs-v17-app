const AccessTokenManager = require('../../../src/application/security/AccessTokenManager');
const MockAccessTokenManager = class extends AccessTokenManager {};
const mockAccessTokenManager = new MockAccessTokenManager();

const VerifyAccessToken = require('../../../src/application/use_cases/VerifyAccessToken');
const useCase = new VerifyAccessToken(mockAccessTokenManager);

test('should resolve with the decoded user data (ID) when OAuth JWT access token is valid', () => {
  // given
  mockAccessTokenManager.decode = () => {
    return { uid: 1234 };
  };

  // when
  const promise = useCase.execute('some-jwt-access-token');

  // then
  return expect(promise).resolves.toEqual({ uid: 1234 });
});

test('should reject when OAuth JWT access token is invalid', () => {
  // given
  mockAccessTokenManager.decode = () => null;

  // when
  const promise = useCase.execute('a-wrong-jwt-access-token');

  // then
  return expect(promise).rejects.toThrow('Invalid access token');
});
