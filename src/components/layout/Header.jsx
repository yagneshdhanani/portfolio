import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollHeader } from "../../hooks/useScrollHeader";
import { ThemeToggle } from "../ui/ThemeToggle";
import { cn } from "../../lib/cn";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const navLinkBase =
  "relative rounded-sm py-1 text-sm font-medium transition-colors duration-150 cursor-pointer after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-foreground after:transition-transform after:duration-300 after:ease-out after:content-[''] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background";

const currentYear = new Date().getFullYear();

export function Header() {
  const { isScrolled } = useScrollHeader();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!isMobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href),
    ).filter(Boolean);

    const visible = new Set();

    const pick = () => {
      const active = sections.find((s) => visible.has(s.id));
      if (active) setActiveSection(active.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        pick();
      },
      { rootMargin: "-10% 0px -85% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));

    // lightweight fallback: activate last section when scrolled to page bottom
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActiveSection(sections.at(-1)?.id ?? "home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setIsMobileOpen(false);

    const target = document.querySelector(href);
    if (!target) return;

    if (href === "#home") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.history.pushState(null, "", href);
    }

    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-50 translate-y-0 border-b border-border backdrop-blur-md transition-[background-color] duration-400",
          isScrolled ? "bg-background/90" : "bg-background/75",
        )}
      >
        <div className="mx-auto flex h-16 max-w-(--content-max-width) items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#home"
            aria-label="Home"
            onClick={(event) => handleNavClick(event, "#home")}
            className="rounded-md font-display text-xl font-extrabold tracking-tight text-foreground cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            YD.
          </a>

          {/* Desktop nav */}
          <nav className="header-nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={
                  activeSection === item.href.slice(1) ? "location" : undefined
                }
                onClick={(event) => handleNavClick(event, item.href)}
                className={cn(
                  navLinkBase,
                  activeSection === item.href.slice(1)
                    ? "text-foreground after:scale-x-100"
                    : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="header-menu-btn h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors duration-150 cursor-pointer hover:border-border-strong hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="header-mobile-overlay fixed inset-x-0 top-16 bottom-0 z-40 bg-background"
          >
            <nav
              className="flex flex-1 flex-col items-center justify-center gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.28,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  aria-current={
                    activeSection === item.href.slice(1)
                      ? "location"
                      : undefined
                  }
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={cn(
                    "w-full max-w-xs rounded-lg px-8 py-4 text-center font-display text-3xl font-bold tracking-tight transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
                    activeSection === item.href.slice(1)
                      ? "text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <p className="pb-10 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
              Yagnesh Dhanani · {currentYear}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
