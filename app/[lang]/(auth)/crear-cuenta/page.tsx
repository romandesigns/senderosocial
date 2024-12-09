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
    locale: formData.get("lang") as string,
  };
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
  lang,
  searchParams,
}: {
  lang: Locale;
  searchParams: Promise<{ errors: any; values: any }>;
}) {
  const errorParams = await searchParams;
  console.log(errorParams, "params");
  return (
    <>
      <section className="h-screen w-screen flex justify-stretch items-stretch">
        {/* <article className="bg-neutral-100 flex-1">Image Gallery</article> */}
        <article className="bg-neutral-200 flex-1 flex items-center justify-center">
          <Card className="max-w-lg mx-auto">
            <Form action={createAccountAction}>
              <CardHeader>
                <CardTitle className="font-black">Crear cuenta</CardTitle>
                <CardDescription>
                  Regístrate para acceder a dashboard
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* User Name and Last name */}
                <Group classNames="gap-2">
                  <Label className="flex-1">
                    <p className="py-1 text-sm text-muted-foreground">Nombre</p>
                    <Input type="text" name="name" />
                  </Label>
                  <Label className="flex-1">
                    <p className="py-1 text-sm text-muted-foreground">
                      Apellido
                    </p>
                    <Input type="text" name="lastName" />
                  </Label>
                </Group>
                <DatePicker
                  lang={lang}
                  name="dateOfBirth"
                  direction="left"
                  classNames="my-4 block"
                />
                {/* User Role */}
                <Label className="my-4 block">
                  <p className="pb-1 text-sm text-muted-foreground">
                    Rol de usuario
                  </p>
                  <Select name="role">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione rol" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="organizer">Organizador</SelectItem>
                      <SelectItem value="participant">Participante</SelectItem>
                    </SelectContent>
                  </Select>
                </Label>
                {/* User Email */}
                <Label className="flex-1">
                  <p className="pb-1 text-sm text-muted-foreground">Email</p>
                  <Input type="email" name="email" />
                </Label>
                {/* User Password */}
                <Label className="flex-1">
                  <p className="py-1 text-sm text-muted-foreground">
                    Contraseña
                  </p>
                  <Input
                    name="password"
                    type="password"
                    placeholder="&bull; &bull; &bull; &bull; &bull; &bull;"
                  />
                </Label>
                {/* User Password Confirm */}
                <Label className="flex-1">
                  <p className="py-1 text-sm text-muted-foreground">
                    Confirma Contraseña
                  </p>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="&bull; &bull; &bull; &bull; &bull; &bull;"
                  />
                </Label>
                <Input
                  type="text"
                  name="lang"
                  value={lang}
                  readOnly
                  className="hidden"
                />
              </CardContent>
              <CardFooter>
                <Button size="block" type="submit">
                  Crear cuenta
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </article>
      </section>
    </>
  );
}
