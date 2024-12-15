export interface UserAuthTypes {
  email: string;
  password: string;
  locale: string;
}

export interface UserProfileTypes {
  name: string;
  lastName: string;
  dateOfBirth: Date;
  role: string;
  authId: string;
}
