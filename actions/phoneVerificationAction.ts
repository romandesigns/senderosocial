import { db } from "@/app/db/connection";
import { User, UserAuth } from "@/app/db/schema/user";
import {
  createVerification,
  createVerificationCheck,
} from "@/twillio/twillioPhoneVerification";
import { phoneValidationSchema } from "@/zodSchemas";
import { eq } from "drizzle-orm";
import { optValidationSchema } from "@/zodSchemas/phoneValidationSchema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Check if the phone number is valid and send a verification code
export async function phoneVerificationAction(formData: FormData) {
  "use server";
  const cookieStore = await cookies();
  const userStoreInCookie = cookieStore.get("new_user");
  const newUser = userStoreInCookie
    ? JSON.parse(userStoreInCookie.value)
    : null;

  const {
    phoneNumber,
    countryCode,
    countryCallingCode,
    nationalNumber,
    internationalNumber,
    possibleCountries,
    isValid,
    isPossible,
    uri,
    type,
  } = JSON.parse(formData.get("phoneData") as string);

  const payload = {
    phone: formData.get("phone") as string,
    locale: formData.get("locale") as string,
    twillioLocale: formData.get("twillioLocale") as string,
    phoneNumber,
    countryCode,
    countryCallingCode,
    nationalNumber,
    internationalNumber,
    possibleCountries,
    isValid,
    isPossible,
    uri,
    type,
  };

  const updatedUserAuth = await db
    .update(UserAuth)
    .set({
      phone: payload.phone,
      twillioLocale: payload.twillioLocale,
      phoneNumber: payload.phoneNumber,
      countryCode: payload.countryCode,
      countryCallingCode: payload.countryCallingCode,
      nationalNumber: payload.nationalNumber,
      internationalNumber: payload.internationalNumber,
      possibleCountries: payload.possibleCountries,
      isValid: payload.isValid,
      isPossible: payload.isPossible,
      uri: payload.uri,
      type: payload.type,
    })
    .where(eq(UserAuth.id, newUser.userAuthId))
    .returning();

  console.log(updatedUserAuth);
  return;
  if (updatedUserAuth[0].isValid && updatedUserAuth[0].isPossible) {
    const verificationResult = await createVerification({
      phone: updatedUserAuth[0].phoneNumber as string,
      twillioLocale: payload.twillioLocale,
    });
    if (verificationResult.sid && verificationResult.status === "pending") {
      redirect(`/${payload.locale}/crear-cuenta/verificacion/codigo?sent=true`);
    }
  }

  // const result = phoneValidationSchema.safeParse(payload);
  // if (!result.success) {
  //   const errors = result.error.errors.map((err) => err.message);
  //   redirect(
  //     `/${payload.locale}/crear-cuenta?verificacion=phone&errors=phone%3D%5B%22is%3D%5B%22invalid`
  //   );
  // }
  // const verificationResult = await createVerification({
  //   phone: payload.phone,
  //   twillioLocale: payload.twillioLocale,
  // });
  // if (verificationResult.sid && verificationResult.status === "pending") {
  //   redirect(`/${payload.locale}/crear-cuenta?verificacion=phone&opt=sent`);
  // }
}

// Check if the verification code is valid
export async function otpVerificationAction(formData: FormData) {
  "use server";
  const payload = {
    otp: formData.get("otp") as string,
    locale: formData.get("locale") as string,
  };
  console.log(payload);

  if (!payload.otp) {
    redirect(`/${payload.locale}/crear-cuenta/verificacion/codigo?sent=true`);
  }

  const checkVerification = await createVerificationCheck({
    code: payload.otp,
  });

  console.log(checkVerification);

  // if (checkVerification.status === "approved") {
  //   redirect(
  //     `/${payload.locale}/crear-cuenta/verificacion/codigo?approved=true`
  //   );
  // } else {
  //   redirect(`/${payload.locale}/crear-cuenta/verificacion/codigo?error=true`);
  // }
}
