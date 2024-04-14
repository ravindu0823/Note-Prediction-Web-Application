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

export async function getCookie(name: string) {
  return await cookies().get(name);
}

export async function validateCookie(name: string) {
  if (!cookies().get(name)) {
    return false;
  }

  return true;
}
