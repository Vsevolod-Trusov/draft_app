enum Routes {
  UsersPrefix = 'users',
  MailPrefix = 'mail',
  Send = 'send',
  ById = ':id',
}

enum Params {
  Id = 'id',
}

enum HeaderNames {
  RefreshHeader = 'x-refresh-header',
  Authorization = 'Authorization',
}
export { HeaderNames, Params, Routes };
