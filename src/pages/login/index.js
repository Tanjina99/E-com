import { Inter } from "next/font/google";
import Header from "@/components/shared/Header/Header";
import HeadComp from "@/components/shared/HeadComp";
import LoginPage from "@/components/auth/LoginPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeadComp />
      <Header />
      <main className="main_container">
        <LoginPage />
      </main>
    </>
  );
}
