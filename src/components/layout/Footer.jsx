import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { FOOTER_SOCIALS } from "../../content/site.config";

const SOCIAL_ICONS = { GitHub: Github, LinkedIn: Linkedin, Twitter };

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-(--content-max-width) flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <p className="font-mono text-xs text-subtle">
          © {currentYear}{" "}
          <span className="font-medium text-foreground">Yagnesh Dhanani</span> —
          Built with React
        </p>

        <div className="flex items-center gap-2">
          {FOOTER_SOCIALS.map((link) => {
            const Icon = SOCIAL_ICONS[link.name];
            if (!Icon) return null;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-subtle transition-colors duration-150 cursor-pointer hover:border-border-strong hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
