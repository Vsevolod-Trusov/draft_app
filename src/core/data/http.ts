enum Routes {
  ApiV1 = 'api/v1',
  UsersPrefix = 'users',
  MailPrefix = 'mail',
  Send = 'send',
  ById = ':id',
  Swagger = 'swagger',
}

enum Params {
  Id = 'id',
}

enum HeaderNames {
  RefreshHeader = 'x-refresh-header',
  Authorization = 'Authorization',
}

const DEFAULT_PORT = 3000;
const DEFAULT_ADDRESS = '::';
const UNKNOWN_INSTANCE = 'unknwon-instance';

export { DEFAULT_ADDRESS, DEFAULT_PORT, HeaderNames, Params, Routes, UNKNOWN_INSTANCE };
