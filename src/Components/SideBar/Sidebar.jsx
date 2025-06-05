import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Pin, PinOff } from "lucide-react";
import Home from "../../Svgs/Home";
import Support from "../../Svgs/Support";
import Help from "../../Svgs/Help";
import Logo from "../../Svgs/logo";
import Text from "../../Svgs/text";
import Invoices from "../../Svgs/Invoives";
import ShopIcon from "../../Svgs/ShopIcon";
import Subscriptions from "../../Svgs/Subscriptions";
import Permisions from "../../Svgs/Permissions";
import "./sidebar.scss";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isPinned, setIsPinned] = useState(
    localStorage.getItem("sidebarPinned") === "true"
  );
  const [expanded, setExpanded] = useState(
    localStorage.getItem("sidebarPinned") === "true"
  );

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/Dashboard/Home")) {
      setSelectedItem("dashboard");
      setSelectedSubItem("");
    } else if (path.includes("/Dashboard/Shops")) {
      setSelectedItem("Shops");
      setSelectedSubItem("");
    } else if (path.includes("/Dashboard/Users")) {
      setSelectedItem("Users");
      setSelectedSubItem("");
    } else if (path.includes("/Dashboard/Plans")) {
      setSelectedItem("Subscriptions");
      setSelectedSubItem("Plans");
      setOpenSubmenu("Subscriptions");
    } else if (path.includes("/Dashboard/ShopSub")) {
      setSelectedItem("Subscriptions");
      setSelectedSubItem("Shop subscriptions");
      setOpenSubmenu("Subscriptions");
    } else if (path.includes("/Dashboard/AllPermissions")) {
      setSelectedItem("Permisions");
      setSelectedSubItem("");
    } else if (path.includes("/Dashboard/Support")) {
      setSelectedItem("support");
      setSelectedSubItem("");
    } else if (path.includes("/Dashboard/Faqs")) {
      setSelectedItem("help");
      setSelectedSubItem("");
    }
  }, [location]);

  const togglePin = (e) => {
    e.stopPropagation();
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    setExpanded(newPinnedState);
    localStorage.setItem("sidebarPinned", newPinnedState.toString());
  };

  const handleItemClick = (item) => {
    if (item.subItems) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
      if (!openSubmenu || openSubmenu !== item.id) {
        setSelectedItem(item.id);
      }
    } else {
      setSelectedItem(item.id);
      setSelectedSubItem("");
      setOpenSubmenu(null);
      if (item.onclick) item.onclick();
    }
  };

  const handleSubItemClick = (mainItem, subItem) => {
    setSelectedItem(mainItem.id);
    setSelectedSubItem(subItem.id);
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
      onclick: () => navigate("/Dashboard/Shops"),
    },
    {
      id: "Users",
      label: "Users",
      icon: <Invoices />,
      onclick: () => navigate("/Dashboard/Users"),
    },
    {
      id: "Subscriptions",
      label: "Subscriptions",
      icon: <Subscriptions />,
      subItems: [
        {
          id: "Plans",
          label: "Plans",
          onclick: () => navigate("/Dashboard/Plans"),
        },
        {
          id: "Shop subscriptions",
          label: "Shop subscriptions",
          onclick: () => navigate("/Dashboard/ShopSub"),
        },
      ],
    },
    {
      id: "Permisions",
      label: "Permissions",
      icon: <Permisions />,
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
      onclick: () => navigate("/Dashboard/Faqs"),
    },
  ];

  return (
    <div
      className={`sidebar min-h-screen ${expanded ? "expanded" : ""} ${
        isPinned ? "pinned" : ""
      }`}
      onMouseEnter={() => !isPinned && setExpanded(true)}
      onMouseLeave={() => !isPinned && setExpanded(false)}
    >
      <div className="sidebar-header">
        {expanded ? (
          <div className="header-expanded">
            <Text />
            <button
              onClick={togglePin}
              className="pin-button"
              title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
              aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              {isPinned ? (
                <PinOff size={18} className="text-white" />
              ) : (
                <Pin size={18} className="text-white" />
              )}
            </button>
          </div>
        ) : (
          <div className="header-collapsed">
            <Logo />
          </div>
        )}
      </div>

      <div className="sidebar-content">
        <div className="main-menu">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item-container">
              <div
                className={`menu-item ${
                  selectedItem === item.id ? "active" : ""
                }`}
                onClick={() => handleItemClick(item)}
                data-id={item.id}
              >
                <div className="menu-icon">
                  {React.cloneElement(item.icon, {
                    className: `${
                      selectedItem === item.id ? "icon-active" : ""
                    }`,
                  })}
                </div>
                {expanded && (
                  <div className="menu-content">
                    <span className="menu-label">{item.label}</span>
                    {item.subItems && (
                      <span className="menu-chevron">
                        {openSubmenu === item.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {item.subItems && openSubmenu === item.id && expanded && (
                <div className="submenu">
                  {item.subItems.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={`submenu-item ${
                        selectedSubItem === subItem.id ? "active" : ""
                      }`}
                      onClick={() => handleSubItemClick(item, subItem)}
                    >
                      <span className="submenu-label">{subItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bottom-menu">
          {bottomMenuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${
                selectedItem === item.id ? "active" : ""
              }`}
              onClick={() => handleItemClick(item)}
              data-id={item.id}
            >
              <div className="menu-icon">
                {React.cloneElement(item.icon, {
                  className: `${selectedItem === item.id ? "icon-active" : ""}`,
                })}
              </div>
              {expanded && (
                <div className="menu-content">
                  <span className="menu-label">{item.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;