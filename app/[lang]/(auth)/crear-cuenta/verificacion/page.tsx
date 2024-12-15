// import { createAccountAction } from "@/actions";
import { phoneVerificationAction } from "@/actions";
import { Group } from "@/components/Group";
import { PhoneInputDefault } from "@/components/phone-example/phone-input-default";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n-config";
import { IoMdHelpCircle } from "@/icons";
import { twillioLocales } from "@/twillio/twilio-locales";
import { CountryCode } from "libphonenumber-js";
import Form from "next/form";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const cookieStore = await cookies();
  const userStoreInCookie = cookieStore.get("new_user");
  const newUser = userStoreInCookie
    ? JSON.parse(userStoreInCookie.value)
    : null;

  // Get COUNTRY CODE from headers
  const siteHeaders = await headers();
  const countryCode = siteHeaders
    .get("accept-language")
    ?.split(",")[0] // Get the first preferred language
    ?.split("-")[1] // Extract the country code part (e.g., "US" from "en-US")
    ?.toUpperCase(); // Ensure uppercase (e.g., "us" -> "US")

  // Redirect user to sign up if no user is found in the cookie
  if (!newUser || newUser.phoneVerified) {
    redirect(`/${lang}/crear-cuenta`);
  }

  return (
    <>
      <section className="h-screen w-screen flex justify-stretch items-stretch">
        {/* <article className="bg-neutral-100 flex-1">Image Gallery</article> */}
        <article className="bg-neutral-200 flex-1 flex items-center justify-center px-2">
          <Card className="w-full max-w-[27.3rem] overflow-hidden">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">
                Verificacion de cuenta
              </CardTitle>
              <CardDescription>
                Inserta numbero de telefono para verificar tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form action={phoneVerificationAction}>
                <Group direction="column" classNames="gap-4">
                  <PhoneInputDefault
                    hiddenDetails
                    countryCode={countryCode as CountryCode}
                  />
                  <Input
                    type="text"
                    defaultValue={lang}
                    className="hidden"
                    name="locale"
                  />
                  <Select name="twillioLocale">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Language" />
                    </SelectTrigger>
                    <SelectContent className="h-60 overflow-y-auto">
                      {twillioLocales.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Group>
                <Button size="block" className="mt-6" type="submit">
                  Enviarme el Codigo
                </Button>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end items-center border border-t bg-muted p-0">
              <small className="text-primary flex justify-end items-center gap-2 p-1  m-2 mx-5 rounded-md underline">
                Ayuda <IoMdHelpCircle />
              </small>
            </CardFooter>
          </Card>
        </article>
      </section>
    </>
  );
}
