import { useState } from "react";
import { motion } from "framer-motion";


export default function Navbar() {
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className="nav-wrapper">
      <div className="nav-logo">
        HET<span>EDIT</span>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="nav-item-wrapper"
            onClick={() => setActive(item.id)}
          >
            <span
              className={`nav-item ${
                active === item.id ? "active" : ""
              }`}
            >
              {item.name}
            </span>

            {active === item.id && (
              <motion.div
                layoutId="nav-indicator"
                className="nav-indicator"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
          </a>
        ))}
      </nav>
    </header>
  );
}