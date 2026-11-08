type Props = {
  titel: string;
  text: string;
};

export function PageHeader({ titel, text }: Props) {
  return (
    <section className="border-b border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-800">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-14 md:px-10 md:py-20">
        <h1 className="font-heading text-4xl font-bold uppercase leading-none text-zinc-100 md:text-6xl">
          {titel}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-zinc-300">{text}</p>
      </div>
    </section>
  );
}
