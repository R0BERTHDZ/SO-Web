import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "70px" }}>
        <MainContent />
      </main>
    </>
  );
}
