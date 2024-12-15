// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function createVerification({
  phone,
  twillioLocale = "es",
}: {
  phone: string;
  twillioLocale: string;
}) {
  const verification = await client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({
      friendlyName: "SenderoSocial",
      channel: "sms",
      to: phone,
      locale: twillioLocale,
    });
  return verification;
}

export async function createVerificationCheck({ code }: { code: string }) {
  const verificationCheck = await client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({
      code: code,
      to: process.env.TWILIO_PHONE_NUMBER,
    });
  return verificationCheck;
}
