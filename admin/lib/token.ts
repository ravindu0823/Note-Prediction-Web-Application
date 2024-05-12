"use server";
import axios, { VALIDATE_ADMIN } from "@/axios/axios";
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
  return cookies().get(name);
}

export async function validateCookie(name: string) {
  if (!cookies().get(name)) {
    return false;
  }

  return true;
}

export async function deleteCookie(name: string) {
  await cookies().delete(name);
}

export async function validateCookieExpire(name: string) {
  const token = await cookies().get(name);

  try {
    const res = await axios.get(VALIDATE_ADMIN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.statusText) return false;

    return true;
  } catch (error) {
    return false;
  }
}
