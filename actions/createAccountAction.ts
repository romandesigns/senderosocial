import { newAccountValidation } from "@/zodSchemas";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createUserAuth, createUserProfile } from "./utils/accountActions";
import { cookies } from "next/headers";

export async function createAccountAction(formData: FormData) {
  "use server";

  // Extract payload data
  const payload = {
    name: formData.get("name") as string,
    lastName: formData.get("lastName") as string,
    dateOfBirth: formData.get("dateOfBirth") as string,
    role: formData.get("role") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    locale: formData.get("locale") as string,
  };

  // Validate payload
  const result = newAccountValidation.safeParse(payload);

  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message);
    const queryParams = new URLSearchParams({
      errors: JSON.stringify(errors),
      values: JSON.stringify(payload),
    });
    redirect(`/en/crear-cuenta?${queryParams}`);
  }

  // Hash password and create user
  const response = await handleAccountCreation(payload);

  // Redirect on success or failure
  if (!response.success) {
    redirect(`/${payload.locale}/crear-cuenta?error=${response.error}`);
  } else {
    redirect(`/${payload.locale}/crear-cuenta/verificacion?metodo=phone`);
  }
}

async function handleAccountCreation(payload: any) {
  const cookieStore = await cookies();

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    // Create UserAuth in DB
    const userAuth = await createUserAuth({
      email: payload.email,
      password: hashedPassword,
      locale: payload.locale,
    });

    // Create UserProfile in DB
    const userProfile = await createUserProfile({
      name: payload.name,
      lastName: payload.lastName,
      dateOfBirth: new Date(payload.dateOfBirth),
      role: payload.role,
      authId: userAuth[0].id,
    });

    // Prepare response object
    const response: Partial<(typeof userAuth)[0] & (typeof userProfile)[0]> = {
      ...userAuth[0],
      ...userProfile[0],
    };

    delete response.password;
    delete response.userAuthId;
    await cookieStore.set("new_user", JSON.stringify(response));
    return { success: true, user: response };
  } catch (error) {
    console.error("Error creating account:", error);
    return { success: false, error: "Account creation failed" };
  }
}
