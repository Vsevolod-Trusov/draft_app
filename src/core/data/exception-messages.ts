enum ExceptionMessage {
  WrongUserOptions = 'wrong user options',
  OAuthCodeUndetected = 'authorization code is missing',
  InvalidFilterQueryParameter = 'invalid filter query parameter format',
  InvalidJwtSub = 'invalid payload: sub must be a number',
  JwtSubRequired = 'invalid payload: sub is required',
  InvalidJwtRoleFormat = 'invalid payload: role must be a string',
  JwtRoleRequired = 'invalid payload: role is required',
}

export { ExceptionMessage };
