import Link from "next/link";

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Meetings</h1>
        <p className="mt-2 text-slate-600">View and manage sacrament meetings.</p>
      </div>
      <nav className="mb-8 flex flex-wrap gap-3 border-b border-slate-200 pb-4">
        <Link href="/meetings" className="rounded-md bg-secondary px-4 py-2 font-medium text-white transition hover:bg-accent" >All Meetings</Link>
        <Link href="/meetings/current" className="rounded-md bg-secondary px-4 py-2 font-medium text-white transition hover:bg-accent" >Current Meeting</Link>
      </nav>
      {children}
    </section>
  );
}