import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";
import { SectionLabel } from "../ui/SectionLabel";
import { Card } from "../ui/Card";
import { ActivityChart } from "../ui/ActivityChart";
import { CONTACT_COPY, CONTACT_SOCIALS, OWNER } from "../../content/site.config";
import { cn } from "../../lib/cn";

const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter,
  Email: Mail,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT_CLASS = [
  "w-full rounded-md border border-border bg-background px-4 py-3",
  "text-foreground placeholder:text-subtle",
  "transition-colors duration-200",
  "focus:border-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
].join(" ");

export function Contact({ showHeader = true }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setStatus("");
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = "That email looks off.";
    if (!form.subject.trim()) next.subject = "Add a subject.";
    if (!form.message.trim()) next.message = "Write a short message.";
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(form.subject.trim());
    const body = encodeURIComponent(
      [
        form.message.trim(),
        "",
        `From: ${form.name.trim()}`,
        `Reply-to: ${form.email.trim()}`,
      ].join("\n"),
    );

    window.location.href = `mailto:${OWNER.email}?subject=${subject}&body=${body}`;
    setStatus("Email draft opened in your mail client.");
  };

  const fields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "you@email.com",
    },
    { id: "subject", label: "Subject", type: "text", placeholder: "Subject" },
  ];

  return (
    <AnimatedSection>
      {showHeader ? (
        <>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 id="contact-heading" className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s build something
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            Have a project, a role, or just an idea worth talking through? My
            inbox is open.
          </p>
        </>
      ) : null}

      <div
        className={cn(
          "grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch",
          showHeader && "mt-12",
        )}
      >
        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="flex h-full flex-col gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {CONTACT_COPY.directTitle}
            </h3>
          </div>

          {fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="sr-only">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.id]}
                onChange={update(field.id)}
                aria-invalid={!!errors[field.id]}
                aria-describedby={
                  errors[field.id] ? `${field.id}-error` : undefined
                }
                className={INPUT_CLASS}
              />
              {errors[field.id] ? (
                <p
                  id={`${field.id}-error`}
                  className="mt-1 text-xs text-red-500 dark:text-red-400"
                >
                  {errors[field.id]}
                </p>
              ) : null}
            </div>
          ))}

          <div className="flex flex-1 flex-col">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell me about it..."
              value={form.message}
              onChange={update("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cn(INPUT_CLASS, "min-h-35 flex-1 resize-none")}
            />
            {errors.message ? (
              <p
                id="message-error"
                className="mt-1 text-xs text-red-500 dark:text-red-400"
              >
                {errors.message}
              </p>
            ) : null}
          </div>

          {status ? (
            <p className="text-sm text-muted" role="status">
              {status}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-foreground px-6 text-sm font-semibold text-background transition-opacity duration-200 cursor-pointer hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Compose Email
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.form>

        {/* Info */}
        <div className="flex h-full flex-col gap-8">
          {/* Activity heatmap */}
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              Recent activity
            </span>
            <div className="mt-3">
              <ActivityChart />
            </div>
          </div>

          {/* Social links */}
          <div className="mt-auto flex flex-col gap-3">
            {CONTACT_SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.name] ?? ArrowUpRight;
              const external = social.href.startsWith("http");
              return (
                <a
                  key={social.name}
                  href={social.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group block rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Card
                    interactive
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <Icon
                      className="h-5 w-5 text-subtle group-hover:text-foreground"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {social.name}
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 text-subtle opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Contact;
