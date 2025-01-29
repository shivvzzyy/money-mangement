import React from "react";
import { createPopper } from "@popperjs/core";
import ThemeController from "../Navbar/ThemeController";
import { useUser } from "../../context/userContext";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const { user } = useUser();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // Dropdown items
  const dropdownItems = [
    { name: "Profile", action: () => console.log("Profile clicked") },
    { name: "Help", action: () => console.log("Help clicked") },
    { name: "Logout", action: () => console.log("Logout clicked") },
  ];

  if (!user) return null;

  return (
    <>
      <a
        className="text-base-content block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-base-content bg-base-200 inline-flex items-center justify-center rounded-full mr-4">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1.jpg"
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-base-100 text-base-content z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <h1 className="text-base text-center py-2">{user.name}</h1>
        {dropdownItems.map((item, index) => (
          <a
            key={index}
            href="#pablo"
            className={
              "text-sm w-full bg-transparent text-base-content btn btn-ghost"
            }
            onClick={(e) => {
              e.preventDefault();
              item.action();
            }}
          >
            {item.name}
          </a>
        ))}
      </div>
      <ThemeController />
    </>
  );
};

export default UserDropdown;
