import React, { useState } from "react";
import "./sidebar.scss";
import { useNavigate } from "react-router-dom";
import Home from "../../Svgs/Home";
import Clients from "../../Svgs/Clients";
import Support from "../../Svgs/Support";
import Help from "../../Svgs/Help";
import Logo from "../../Svgs/logo";
import Text from "../../Svgs/text";
import { ChevronDown, ChevronUp } from "lucide-react";
import Invoices from "../../Svgs/Invoives";
import ShopIcon from "../../Svgs/ShopIcon";
import Subscriptions from "../../Svgs/Subscriptions";
import Permisions from "../../Svgs/Permissions";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.id);

    if (item.subItems) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else {
      setOpenSubmenu(null);
      if (item.onclick) {
        item.onclick();
      }
    }
  };

  const handleSubItemClick = (mainItem, subItem) => {
    setSelectedItem(subItem.id);
    if (subItem.onclick) {
      subItem.onclick();
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home />,
      onclick: () => navigate(""),
    },
    {
      id: "Shops",
      label: "Shops",
      icon: <ShopIcon />,
      padding: "3px",
      onclick: () => navigate(""),
    },
    {
      id: "Users",
      label: "Users",
      icon: <Invoices />,
      padding: "4px",
      onclick: () => navigate(""),
    },
    {
      id: "Customers",
      label: "Customers",
      icon: <Clients />,
      padding: "3px",
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
          onclick: () => navigate(""),
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
      onclick: () => navigate(""),
    },
  ];

  const bottomMenuItems = [
    {
      id: "support",
      label: "Support",
      icon: <Support />,
      onclick: () => navigate("support"),
    },
    {
      id: "help",
      label: "Help",
      icon: <Help />,
      padding: "5px",
      onclick: () => navigate("Faqs"),
    },
  ];

  return (
    <div
      className={`sidebar bg-black min-h-screen w-20 flex flex-col items-center justify-between ${
        expanded ? "expanded" : ""
      }`}
      onMouseEnter={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="logo mt-5 mb-5">
            <Logo />
          </div>
          <div className="text">
            <Text />
          </div>
        </div>

        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 hover:w-[190px] ${
                openSubmenu === item.id ? "active-menu-item" : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <span className="icon">
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon || "/placeholder.svg"}
                    alt={item.label}
                    aria-label={item.label}
                    style={{
                      height: item.height,
                      width: item.width,
                      padding: item.padding,
                    }}
                    className={`${
                      selectedItem === item.id ? "selectedImg" : ""
                    }`}
                  />
                ) : (
                  React.cloneElement(item.icon, {
                    style: {
                      height: item.height,
                      width: item.width,
                      padding: item.padding,
                    },
                    className: `${
                      selectedItem === item.id ? "selectedImg" : ""
                    }`,
                  })
                )}
              </span>
              <span
                className={`text-white text-14 dashbordItem ${
                  selectedItem === item.id ? "selected" : ""
                }`}
              >
                {item.label}
              </span>
              {item.subItems && expanded && (
                <span className="ml-auto dashbordItem">
                  {openSubmenu === item.id ? (
                    <ChevronUp size={16} className="text-white" />
                  ) : (
                    <ChevronDown size={16} className="text-white" />
                  )}
                </span>
              )}
            </div>

            {item.subItems && openSubmenu === item.id && expanded && (
              <div className="submenu pl-8 mt-1 flex flex-col gap-2">
                {item.subItems.map((subItem) => (
                  <div
                    key={subItem.id}
                    className={`flex items-center gap-2 cursor-pointer rounded-md ${
                      selectedItem === subItem.id ? "selected-submenu-item" : ""
                    }`}
                    onClick={() => handleSubItemClick(item, subItem)}
                  >
                    {subItem.icon && (
                      <span className="icon">
                        {typeof subItem.icon === "string" ? (
                          <img
                            src={subItem.icon || "/placeholder.svg"}
                            alt={subItem.label}
                            aria-label={subItem.label}
                            style={{
                              height: subItem.height,
                              width: subItem.width,
                              padding: subItem.padding,
                            }}
                            className={`${
                              selectedItem === subItem.id ? "selectedImg" : ""
                            }`}
                          />
                        ) : (
                          React.cloneElement(subItem.icon, {
                            style: {
                              height: subItem.height,
                              width: subItem.width,
                              padding: subItem.padding,
                            },
                            className: `${
                              selectedItem === subItem.id ? "selectedImg" : ""
                            }`,
                          })
                        )}
                      </span>
                    )}
                    <span
                      className={`text-white text-14 ${
                        selectedItem === subItem.id ? "selected" : ""
                      }`}
                    >
                      {subItem.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom section for Help and Support */}
      <div className="flex flex-col gap-4 pb-4">
        {bottomMenuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-primatyOpacity hover:p-2 hover:w-180 ${
              selectedItem === item.id ? "active-menu-item" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <span className="icon">
              {typeof item.icon === "string" ? (
                <img
                  src={item.icon || "/placeholder.svg"}
                  alt={item.label}
                  aria-label={item.label}
                  className={`${selectedItem === item.id ? "selectedImg" : ""}`}
                />
              ) : (
                React.cloneElement(item.icon, {
                  className: `${selectedItem === item.id ? "selectedImg" : ""}`,
                })
              )}
            </span>
            <span
              className={`text-white text-14 dashbordItem ${
                selectedItem === item.id ? "selected" : ""
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;