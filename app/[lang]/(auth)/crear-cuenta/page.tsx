// import { createAccountAction } from "@/actions";
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
import { AccountValidation } from "@/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Form from "next/form";
import { redirect } from "next/navigation";
import Link from "next/link";

export async function createAccountAction(formData: FormData) {
  "use server";
  const payload = {
    name: formData.get("name") as string,
    lastName: formData.get("lastName") as string,
    dateOfBirth: formData.get("dateOfBirth") as string,
    role: formData.get("role") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    createdOn: new Date().toISOString(),
    phoneVerified: false,
    emailVerified: false,
    locale: formData.get("locale") as string,
  };

  console.log(payload);
  const result = AccountValidation.safeParse(payload);
  if (!result.success) {
    // Extract error messages
    const errors = result.error.errors.map((err) => err.message);
    const queryParams = new URLSearchParams({
      errors: JSON.stringify(errors),
      values: JSON.stringify(payload),
    });
    // Redirect with errors and submitted values
    redirect(`/en/crear-cuenta?${queryParams}`);
  }
  // Redirect on successful validation
  redirect("/success");
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ errors: any; values: any }>;
}) {
  const errorParams = await searchParams;
  const { lang } = await params;
  const { errors, values } = errorParams;
  const formValues = JSON.parse(values);
  const formErrors = JSON.parse(errors);

  return (
    <>
      <section className="h-screen w-screen flex justify-stretch items-stretch">
        {/* <article className="bg-neutral-100 flex-1">Image Gallery</article> */}
        <article className="bg-neutral-200 flex-1 flex items-center justify-center">
          <Card className="max-w-lg mx-auto">
            <Form action={createAccountAction}>
              <CardHeader>
                <CardTitle className="font-bold text-2xl">
                  Crear cuenta
                </CardTitle>
                <CardDescription>
                  Regístrate para acceder a dashboard
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 pb-0">
                <fieldset className="p-2 py-4">
                  <legend className="text-xs bg-muted text-muted-foreground p-1 px-2 text-right">
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
                        defaultValue={formValues.name || ""}
                      />
                    </Label>
                    <Label className="flex-1">
                      <p className="py-1 text-xs text-muted-foreground">
                        Apellido
                      </p>
                      <Input
                        type="text"
                        name="lastName"
                        defaultValue={formValues.lastName || ""}
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
                <fieldset className="p-2 py-4">
                  <legend className="text-xs bg-muted text-muted-foreground p-1 px-2 text-right">
                    Informacion de Cuenta
                  </legend>
                  {/* User Role */}
                  <Label className="block mb-3">
                    <p className="pb-1 text-xs text-muted-foreground">
                      Rol de usuario
                    </p>
                    <Select name="role" defaultValue={formValues.role || ""}>
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
                      defaultValue={formValues.email || ""}
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
