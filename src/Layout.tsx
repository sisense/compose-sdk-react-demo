import ScrollToHashElement from "./components/ScrollToHashElement";
import SidebarNavigation from "./components/SidebarNavigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-black">
      <header></header>
      <div className="flex overflow-hidden max-h-[100vh] w-full">
        <aside>
          <SidebarNavigation />
        </aside>
        <ScrollToHashElement />

        <main className="px-4 py-4 overflow-auto w-full">{<Outlet />}</main>
      </div>
    </div>
  );
}
