import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const currentPath = window.location.pathname;

  const navItems = [
    {
      name: "Dashboard",
      icon: "fas fa-tv",
      path: "/admin/dashboard",
    },
    {
      name: "Track Expense",
      icon: "fas fa-wallet",
      path: "/admin/track-expense",
    },
    {
      name: "Make Budget",
      icon: "fas fa-chart-pie",
      path: "/admin/make-budget",
    },
    {
      name: "View Reports",
      icon: "fas fa-file-alt",
      path: "/admin/reports",
    },
    {
      name: "Settings",
      icon: "fas fa-tools",
      path: "/admin/settings",
    },
  ];

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-base-100 flex flex-wrap items-center justify-between relative md:w-72 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-base-content opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-base-100 m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link to="/" className="text-primary uppercase font-bold text-lg">
            Money Management System
          </Link>
          <hr className="my-4 md:min-w-full bg-base-300" />
          {/* Collapse */}
          <div
            className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}
          >
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {navItems.map((item, index) => (
                <li key={index} className="items-center">
                  <Link
                    to={item.path}
                    className={`text-base uppercase py-3 font-bold block ${
                      currentPath.includes(item.path)
                        ? "text-primary hover:text-primary-focus"
                        : "text-base-content hover:text-primary-focus"
                    }`}
                  >
                    <i
                      className={`${item.icon} mr-2 text-base ${
                        currentPath.includes(item.path)
                          ? "text-primary"
                          : "text-base-content"
                      }`}
                    ></i>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
