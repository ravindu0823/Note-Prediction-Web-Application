"use client";
import Container from "@components/container";
import { ComplexNavbar } from "@components/nav-bar";

export default function Home() {
  return (
    <main className="bg-hero-image h-screen bg-cover">
      <div className="mx-auto max-w-screen-xl">
        <ComplexNavbar />
        <Container />
      </div>
    </main>
  );
}
