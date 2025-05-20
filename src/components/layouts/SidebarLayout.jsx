import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

export default function Layout({ children }) {
  return (
    <>
    <Header/>
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
    </>
  );
}
