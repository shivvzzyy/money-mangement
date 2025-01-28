import React from "react";
import { Link } from "react-router-dom";
import ThemeController from "./ThemeController";

export default function Navbar(props) {
  return (
    <nav className="fixed z-3 w-full flex flex-wrap items-center justify-between px-4 py-3 navbar-expand-lg bg-base-300 shadow">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Brand Name */}
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extrabold text-primary/80">
              Money Management System
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-5">
          <Link to="/about" className="btn btn-ghost">
            About
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Contact
          </Link>
          <Link to="/auth/login" className="btn btn-secondary">
            Login
          </Link>
          <ThemeController />
        </div>
      </div>
    </nav>
  );
}
