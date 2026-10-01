export default function MeetingNotFound() {
  return (
    <main className="flex min-h-64 flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-primary">
        Meeting Not Found
      </h1>

      <p className="mt-3 text-slate-600">
        The meeting you are looking for does not exist.
      </p>
    </main>
  );
}