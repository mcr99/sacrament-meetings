import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">
            Barcenas 1 Ward
          </p>

          <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Sacrament Meeting Planner
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            View sacrament meeting programs, speakers, hymns, prayers,
            announcements, and ward business in one place.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/meetings"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary"
            >
              View Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-lg border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Current Meeting
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary">
              Meeting Information
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Access the information you need for sacrament meetings.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h4 className="font-semibold text-primary">Meetings</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                View current and previous sacrament meetings.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h4 className="font-semibold text-primary">Hymns</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                See the opening, sacrament, and closing hymns.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h4 className="font-semibold text-primary">Speakers</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                View speakers, topics, and musical numbers.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h4 className="font-semibold text-primary">Announcements</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review announcements and ward business.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
