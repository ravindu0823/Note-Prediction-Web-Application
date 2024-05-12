import UserAuthForm from "@/components/forms/user-auth-form";
import Image from "next/image";

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-[url('https://klang.io/wp-content/uploads/2024/02/klangio_background_tinified.jpg')] bg-no-repeat bg-cover bg-center bg-blend-multiply" />
        <div className="relative z-20 flex items-center text-3xl font-bold gap-4">
          <Image
            src="/assets/images/musify_logo.webp"
            alt="Klang Logo"
            className="rounded-full"
            width={100}
            height={100}
          />
          Musify
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
            <p className="text-sm text-muted-foreground">
              Enter your username and password below to Log In
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
