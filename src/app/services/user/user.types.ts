export interface User {
  id: string;
  login: string;
  password: string;
}

export interface UserPayload {
  login: string;
  password: string;
}
