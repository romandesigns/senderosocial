// import { createAccountAction } from "@/actions";
import { createAccountAction } from "@/actions";
import { DatePicker } from "@/components/DatePicker";
import { Group } from "@/components/Group";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n-config";
import Form from "next/form";
import { headers } from "next/headers";
import Link from "next/link";

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

  const payload = {
    name: "Roman",
    lastName: "Feliz Martinez",
    dateOfBirth: "1946-01-02T00:00:00.000Z",
    role: "organizer",
    email: "roman.feliz@comsol.com",
    password: "@Corina1987",
    confirmPassword: "@Corina1987",
    createdOn: "2024-12-14T00:46:49.107Z",
    phoneVerified: false,
    emailVerified: false,
    locale: "en",
  };

  return (
    <>
      <section className="h-screen w-screen flex justify-stretch items-stretch p-2">
        {/* <article className="bg-neutral-100 flex-1">Image Gallery</article> */}
        <article className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-[27.3rem] overflow-hidden">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Crear cuenta</CardTitle>
              <CardDescription>
                Regístrate para acceder a dashboard
              </CardDescription>
            </CardHeader>
            <Form action={createAccountAction}>
              <CardContent className="flex flex-col gap-4 pb-0">
                <fieldset className="p-2">
                  <legend className="text-xs bg-muted text-muted-foreground p-1 px-2 mb-3 text-right hidden">
                    Informacion de Usuario
                  </legend>
                  {/* User Name and Last name */}
                  <Group classNames="gap-2 mb-2">
                    <Label className="flex-1">
                      <p className="py-1 text-muted-foreground text-xs">
                        Nombre
                      </p>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={payload.name}
                      />
                    </Label>
                    <Label className="flex-1">
                      <p className="py-1 text-xs text-muted-foreground">
                        Apellido
                      </p>
                      <Input
                        type="text"
                        name="lastName"
                        defaultValue={payload.lastName}
                      />
                    </Label>
                  </Group>
                  <DatePicker
                    lang={lang}
                    name="dateOfBirth"
                    direction="left"
                    classNames="block"
                  />
                </fieldset>
                <fieldset className="p-2">
                  <legend className="text-xs bg-muted text-muted-foreground p-1 px-2 mb-3 text-right hidden">
                    Informacion de Cuenta
                  </legend>
                  {/* User Role */}
                  <Label className="block mb-3">
                    <p className="pb-1 text-xs text-muted-foreground">
                      Rol de usuario
                    </p>
                    <Select name="role" defaultValue={payload.role}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione rol" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="organizer">Organizador</SelectItem>
                        <SelectItem value="participant">
                          Participante
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Label>
                  {/* User Email */}
                  <Label className="flex-1 mb-2 block">
                    <p className="pb-1 text-xs text-muted-foreground">Email</p>
                    <Input
                      type="email"
                      name="email"
                      defaultValue={payload.email}
                    />
                  </Label>
                  {/* User Password */}
                  <Label className="flex-1 mb-2 block">
                    <p className="py-1 text-xs text-muted-foreground">
                      Contraseña
                    </p>
                    <Input
                      name="password"
                      type="password"
                      placeholder="&bull; &bull; &bull; &bull; &bull; &bull;"
                      defaultValue={payload.password}
                    />
                  </Label>
                  {/* User Password Confirm */}
                  <Label className="flex-1 mb-2 block">
                    <p className="py-1 text-xs text-muted-foreground">
                      Confirma Contraseña
                    </p>
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="&bull; &bull; &bull; &bull; &bull; &bull;"
                      defaultValue={payload.confirmPassword}
                    />
                    <Input
                      type="text"
                      name="locale"
                      value={lang}
                      readOnly
                      className="hidden"
                    />
                  </Label>
                </fieldset>
              </CardContent>
              <CardFooter className="">
                <Button size="block">Crear cuenta</Button>
              </CardFooter>
            </Form>
            <Group classNames="w-full  gap-2 px-6 pb-4 text-xs">
              <p>Ya tienes cuenta?</p>
              <Link
                href="/en/iniciar-session"
                className="text-blue-700 underline"
              >
                Iniciar Session
              </Link>
            </Group>
          </Card>
        </article>
      </section>
    </>
  );
}
