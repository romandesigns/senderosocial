// import { createAccountAction } from "@/actions";
import { otpVerificationAction } from "@/actions/phoneVerificationAction";
import { Group } from "@/components/Group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { InputOpt } from "@/components/ui/optInput";
import { Locale } from "@/i18n-config";
import Form from "next/form";
import { headers } from "next/headers";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    errors: any;
    values: any;
    verificacion: string;
    opt: string;
  }>;
}) {
  const { errors, values, verificacion, opt } = await searchParams;
  const { lang } = await params;
  // Get COUNTRY CODE from headers
  const siteHeaders = await headers();
  const countryCode = siteHeaders
    .get("accept-language")
    ?.split(",")[0] // Get the first preferred language
    ?.split("-")[1] // Extract the country code part (e.g., "US" from "en-US")
    ?.toUpperCase(); // Ensure uppercase (e.g., "us" -> "US")

  return (
    <>
      <section className="h-screen w-screen flex justify-stretch items-stretch">
        {/* <article className="bg-neutral-100 flex-1">Image Gallery</article> */}
        <article className="bg-neutral-200 flex-1 flex items-center justify-center px-2">
          <Card className="w-full max-w-[27.3rem] overflow-hidden">
            <CardHeader>
              <CardTitle className="font-bold text-md">
                OTP Verfication
              </CardTitle>
              <CardDescription>
                Ingresa el codigo de verificacion enviado a tu telefono
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form action={otpVerificationAction}>
                <Input
                  type="text"
                  defaultValue={lang}
                  className="hidden"
                  name="locale"
                />
                <InputOpt />
                <Button size="block" className="mt-6" type="submit">
                  Verificar
                </Button>
              </Form>
            </CardContent>
          </Card>
        </article>
      </section>
    </>
  );
}
