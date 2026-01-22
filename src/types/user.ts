export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type SignupRequest = User;
export type SignupResponse = User;

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type UserToken = {
  username: string;
  token: string;
  loggedInAt: string;
};
