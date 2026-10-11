import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Create Sacrament Meeting
        </h1>

        <p className="mt-2 text-slate-600">
          Enter the information for the sacrament meeting.
        </p>
      </div>

      <MeetingForm />
    </main>
  );
}
