"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  reset,
}: ErrorPageProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-primary">Something went wrong</h1>
      <p className="mt-4 text-slate-600">We could not load the meetings right now. Please try again.</p>
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <button type="button" onClick={() => reset()} className="rounded-md bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary" > Try Again </button>
        <Link href="/meetings" className="rounded-md border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100" > Back to Meetings </Link>
      </div>
    </main>
  );
}
