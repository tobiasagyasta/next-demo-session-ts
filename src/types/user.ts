export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type SignupRequest = User;
export type SignupResponse = User;
