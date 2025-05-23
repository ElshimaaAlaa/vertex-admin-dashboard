import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.scss";
import Home from "../../Svgs/Home";
import Support from "../../Svgs/Support";
import Help from "../../Svgs/Help";
import Logo from "../../Svgs/logo";
import Text from "../../Svgs/text";
import { ChevronDown, ChevronUp, Pin, PinOff } from "lucide-react";
import Invoices from "../../Svgs/Invoives";
import ShopIcon from "../../Svgs/ShopIcon";
import Subscriptions from "../../Svgs/Subscriptions";
import Permisions from "../../Svgs/Permissions";

const Sidebar = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isPinned, setIsPinned] = useState(false);

  // Sync selected item with current route
  // useEffect(() => {
  //   const path = location.pathname;
  //   if (path.includes("/Dashboard/Home")) setSelectedItem("dashboard");
  //   else if (path.includes("/Dashboard/Shops")) setSelectedItem("Shops");
  //   else if (path.includes("/Dashboard/Users")) setSelectedItem("Users");
  //   else if (path.includes("/Dashboard/Plans")) {
  //     setSelectedItem("Plans");
  //     setOpenSubmenu("Subscriptions");
  //   }
  //   else if (path.includes("/Dashboard/AllPermissions")) setSelectedItem("Permisions");
  //   else if (path.includes("/Dashboard/Support")) setSelectedItem("support");
  //   else if (path.includes("/Dashboard/Faqs")) setSelectedItem("help");
  // }, [location]);

  const toggleSidebar = () => {
    if (!isPinned) setExpanded(!expanded);
  };

  const togglePin = (e) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
    if (!isPinned) setExpanded(true);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.id);
    if (item.subItems) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else {
      setOpenSubmenu(null);
      if (item.onclick) item.onclick();
    }
  };

  const handleSubItemClick = (mainItem, subItem) => {
    setSelectedItem(subItem.id);
    if (subItem.onclick) subItem.onclick();
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home />,
      onclick: () => navigate("/Dashboard/Home"),
    },
    {
      id: "Shops",
      label: "Shops",
      icon: <ShopIcon />,
      padding: "3px",
      onclick: () => navigate("/Dashboard/Shops"),
    },
    {
      id: "Users",
      label: "Users",
      icon: <Invoices />,
      padding: "4px",
      onclick: () => navigate("/Dashboard/Users"),
    },
    {
      id: "Subscriptions",
      label: "Subscriptions",
      icon: <Subscriptions />,
      padding: "2px",
      subItems: [
        {
          id: "Plans",
          label: "Plans",
          onclick: () => navigate("/Dashboard/Plans"),
        },
        {
          id: "Shop subscriptions",
          label: "Shop subscriptions",
          onclick: () => navigate(""),
        },
      ],
    },
    {
      id: "Permisions",
      label: "Permisions",
      icon: <Permisions />,
      padding: "2px",
      onclick: () => navigate("/Dashboard/AllPermissions"),
    },
  ];

  const bottomMenuItems = [
    {
      id: "support",
      label: "Support",
      icon: <Support />,
      onclick: () => navigate("/Dashboard/Support"),
    },
    {
      id: "help",
      label: "Help",
      icon: <Help />,
      padding: "5px",
      onclick: () => navigate("/Dashboard/Faqs"),
    },
  ];

  return (
    <div
      className={`sidebar px-6 bg-black min-h-screen flex flex-col justify-between ${
        expanded ? "expanded w-[250px]" : "w-20"
      } ${isPinned ? "pinned" : ""}`}
      onMouseEnter={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center relative h-16">
          {!expanded && (
            <div className="logo absolute">
              <Logo />
            </div>
          )}
          {expanded && (
            <div className="flex justify-between gap-8 items-center text">
              <div>
                <Text />
              </div>
              <div>
                <button
                  onClick={togglePin}
                  className="pin-button mt-4"
                  title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                >
                  {isPinned ? (
                    <PinOff size={18} className="text-white" />
                  ) : (
                    <Pin size={18} className="text-white" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 ${
                expanded ? "hover:w-[215px]" : "hover:w-20"
              } ${selectedItem === item.id ? "active-menu-item" : ""}`}
              onClick={() => handleItemClick(item)}
            >
              <span className="icon">
                {React.cloneElement(item.icon, {
                  style: { padding: item.padding },
                  className: `${selectedItem === item.id ? "selectedImg" : ""}`,
                })}
              </span>
              {expanded && (
                <>
                  <span className={`text-white text-14 item ${selectedItem === item.id ? "selected" : ""}`}>
                    {item.label}
                  </span>
                  {item.subItems && (
                    <span className="ml-auto">
                      {openSubmenu === item.id ? (
                        <ChevronUp size={16} className="text-white" />
                      ) : (
                        <ChevronDown size={16} className="text-white" />
                      )}
                    </span>
                  )}
                </>
              )}
            </div>

            {item.subItems && openSubmenu === item.id && expanded && (
              <div className="submenu pl-8 mt-1 flex flex-col">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.id}
                    className={`flex gap-2 cursor-pointer rounded-md ${
                      selectedItem === subItem.id ? "selected-submenu-item" : ""
                    }`}
                    onClick={() => handleSubItemClick(item, subItem)}
                  >
                    <span className={`text-white text-14 ${selectedItem === subItem.id ? "selected" : ""}`}>
                      {subItem.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 pb-4">
        {bottomMenuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 ${
              expanded ? "hover:w-[215px]" : "hover:w-20"
            } ${selectedItem === item.id ? "active-menu-item" : ""}`}
            onClick={() => handleItemClick(item)}
          >
            <span className="icon">
              {React.cloneElement(item.icon, {
                className: `${selectedItem === item.id ? "selectedImg" : ""}`,
              })}
            </span>
            {expanded && (
              <span className={`text-white text-14 ${selectedItem === item.id ? "selected" : ""}`}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;