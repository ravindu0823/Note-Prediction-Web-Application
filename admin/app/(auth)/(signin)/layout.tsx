import type { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Authentication forms built using the components.",
};

export default function SignInLayout({ children }: Props) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
