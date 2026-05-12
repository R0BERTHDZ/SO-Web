"use client";
import Navbar from "../components/Navbar";
import CreditsSection from "../components/CreditsSection";

export default function CreditsPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 2rem 5rem" }}>
        <CreditsSection />
      </main>
    </>
  );
}
