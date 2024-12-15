import { UserAuthTypes, UserProfileTypes } from "@/types";
import { User, UserAuth } from "@/app/db/schema/user";
import { db } from "@/app/db/connection";

// Create User Auth
export const createUserAuth = async (payload: UserAuthTypes) => {
  return db
    .insert(UserAuth)
    .values({
      email: payload.email,
      password: payload.password,
      locale: payload.locale,
    })
    .returning()
    .execute();
};

// Create User Profile
export const createUserProfile = async (payload: UserProfileTypes) => {
  return db
    .insert(User)
    .values({
      name: payload.name,
      lastName: payload.lastName,
      dateOfBirth: payload.dateOfBirth,
      role: payload.role,
      userAuthId: payload.authId,
    })
    .returning()
    .execute();
};
