export const BASE_URL = 'http://localhost:3001';

export enum StatusCodeEnum {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum UrlEnum {
  AUTH = '/auth',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  USERS = '/users',
  BOARDS = '/boards',
  BOARDSSET = '/boardsSet',
  COLUMNS = '/columns',
  COLUMNSSET = '/columnsSet',
  TASKS = '/tasks',
  TASKSSET = '/tasksSet',
  FILE = '/file',
  POINTS = '/points',
}

export enum HttpMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
