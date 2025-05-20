import { NavLink } from "react-router-dom";

export default function SidebarLink({ route, linkName }){
  const baseClass = "block px-4 py-3 rounded-lg transition-all duration-200";
  const inactiveClass = "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600";
  const activeClass = "bg-indigo-100 text-indigo-600 font-medium";
  
  return(
      <li>
        <NavLink
          to={`/${route}`}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          {linkName}
        </NavLink>
      </li>
    )    
}