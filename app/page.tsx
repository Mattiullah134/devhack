import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main className=" min-h-screen flex-col items-center justify-between p-24">
      <div>
        <NavBar />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}
