import React, { useEffect, useRef, useState } from "react";
import "../../styles/style.css";
import logo from "../../assets/islalolo_logo.png";


import {Link} from 'react-router';

const Sidebar: React.FC = () => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const toggleSidebar = document.querySelector(".toggle-sidebar");

    if (!sidebar || !toggleSidebar) return;

    const handleSidebarToggle = () => {
      sidebar.classList.toggle("hide");
      setIsCollapsed((prev) => !prev); // Toggle state for logo resizing

      document.querySelectorAll<HTMLLIElement>("#sidebar .divider").forEach((item) => {
        item.textContent = sidebar.classList.contains("hide") ? "-" : item.dataset.text || "";
      });
    };

    toggleSidebar.addEventListener("click", handleSidebarToggle);
    
    return () => {
      toggleSidebar.removeEventListener("click", handleSidebarToggle);
    };
  }, []);

  return (
    <section id="sidebar" ref={sidebarRef} className="transition-all duration-300" >
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center py-4 transition-all duration-300">
 <img
  src={logo}
  alt="Admin Logo"
  style={{
    borderRadius: '9999px',
    objectFit: 'cover',
    transition: 'all 0.3s ease',
    width: isCollapsed ? '2.5rem' : '15.25rem', // 10 * 0.25rem and 45 * 0.25rem
    height: isCollapsed ? '2.5rem' : '11.25rem'
  }}
/>

<h1
  style={{
    marginTop: '1.25rem', // mt-5 = 5 * 0.25rem
    textAlign: 'center',
    fontSize: isCollapsed ? '0.75rem' : '1.125rem' // text-xs = 0.75rem, text-lg = 1.125rem
  }}
>
  ADMIN PANEL
</h1>

</div>


<ul className="side-menu">
  <li>
    <Link 
      to="/admin/dashboard" 
      className={location.pathname === "/admin/dashboard" ? "active" : ""}
    >
      <i className="bx bxs-dashboard icon"></i> Dashboard
    </Link>
  </li>

  <li>
    <Link 
      to="/admin/manage_customer" 
      className={location.pathname === "/admin/manage_customer" ? "active" : ""}
    >
      <i className="bx bx-user icon"></i> Manage Customer
    </Link>
  </li>

  <li>
    <Link 
      to="/admin/manage_category" 
      className={location.pathname === "/admin/manage_category" ? "active" : ""}
    >
      <i className="bx bx-category icon"></i> Manage Category
    </Link>
  </li>

  <li>
    <Link 
      to="/admin/manage_product" 
      className={location.pathname === "/admin/manage_product" ? "active" : ""}
    >
      <i className="bx bx-package icon"></i> Manage Product
    </Link>
  </li>

  <li>
    <Link 
      to="/admin/manage_order" 
      className={location.pathname === "/admin/manage_order" ? "active" : ""}
    >
      <i className="bx bx-cart icon"></i> Manage Order
    </Link>
  </li>


</ul>

    </section>
  );
};

export default Sidebar;
