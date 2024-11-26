import React from "react";
import { Container } from "@/components/Container";
import { HomePage } from "@/components/Home";
import StorageProvider from "@/app/storageProvider";

export default function Home() {
  return (
    <>
      <StorageProvider>
        <Container>
          <HomePage />
        </Container>
      </StorageProvider>
    </>
  );
}
