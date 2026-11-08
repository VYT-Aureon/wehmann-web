import Link from "next/link";
import { site } from "@/data/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} ${site.claim} – Startseite`}
      className={`flex items-center gap-3 ${className}`}
    >
      <svg
        viewBox="0 0 48 32"
        aria-hidden="true"
        className="h-8 w-12 shrink-0 fill-zinc-300"
      >
        <path d="M0 32 L16 4 L26 22 L32 12 L48 32 Z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-2xl font-bold tracking-wide text-zinc-100">
          {site.name}
        </span>
        <span className="font-heading text-[0.65rem] uppercase tracking-[0.2em] text-zinc-400">
          {site.claim}
        </span>
      </span>
    </Link>
  );
}
