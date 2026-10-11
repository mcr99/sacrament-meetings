import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-primary">Meeting not found</h1>
      <p className="mt-4 text-slate-600"> The meeting you are looking for does not exist or may have been removed. </p>
      <Link href="/meetings" className="mt-8 inline-block rounded-md bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary" >Back to Meetings</Link>
    </main>
  );
}
