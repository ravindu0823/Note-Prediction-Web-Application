"use server";
import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
  await cookies().set({
    name: name,
    value: value,
    httpOnly: true,
    path: "/",
  });
}
