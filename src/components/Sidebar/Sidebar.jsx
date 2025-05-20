import { useState } from 'react';
import SidebarLink from "./SidebarLink";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed md:hidden z-50 top-[11px] left-4 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      <aside
        className={`
          fixed md:static z-40 w-64 bg-white shadow-lg border-r h-screen mt-[65px] border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          h-screen flex flex-col
        `}
      >
        <div className="p-4 border-b border-gray-200 bg-white top-0 z-10">
          <h2 className="text-xl font-bold text-indigo-600">Menú</h2>
        </div>
        
        <nav className="p-4 overflow-y-auto flex-1">
          <ul className="space-y-2">
            <SidebarLink route="editor" linkName="Editor" />
            <SidebarLink route="history" linkName="Historial" />
            <SidebarLink route="help" linkName="Ayuda" />
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}