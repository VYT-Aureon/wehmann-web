import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  titel: string;
  link?: { href: string; label: string };
};

export function SectionHeader({ titel, link }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-zinc-100 md:text-4xl">
        {titel}
      </h2>
      {link && (
        <Link
          href={link.href}
          className="group flex items-center gap-2 text-sm text-zinc-400 underline-offset-4 hover:text-zinc-100 hover:underline"
        >
          {link.label}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
