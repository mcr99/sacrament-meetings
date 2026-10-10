import MeetingForm from "@/components/MeetingForm";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMeetingPage({
  params,
}: PageProps) {
  const { id } = await params;

  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Edit Sacrament Meeting
        </h1>

        <p className="mt-2 text-slate-600">
          Update the information for the sacrament meeting.
        </p>
      </div>

      <MeetingForm meeting={meeting} />
    </main>
  );
}
