import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import NavBar from "./NavBar.tsx";

export default function Layout() {
  return (
    <div>
      <Header/>
      <NavBar/>
      <main className="bg-black">
        <Outlet/>
      </main>
    </div>
  );
}