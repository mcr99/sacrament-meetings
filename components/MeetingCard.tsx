import type { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from "@/lib/actions";
import Link from "next/link";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-primary">{meeting.date}</h2>
        <p className="mt-1 text-sm capitalize text-secondary">{meeting.meetingType} Meeting</p>
      </div>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold">Presiding:</span>{" "}
          {meeting.presiding}
        </p>
        <p>
          <span className="font-semibold">Conducting:</span>{" "}
          {meeting.conducting}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href={`/meetings/${meeting.id}`} className="rounded-md bg-secondary px-4 py-2 font-medium text-white transition hover:bg-accent" >View Details</Link>
        <Link href={`/meetings/${meeting.id}/edit`} className="rounded-md border border-primary px-4 py-2 font-medium text-primary transition hover:bg-slate-100" > Edit </Link>
        <form action={deleteMeeting.bind(null, meeting.id)}>
          <button type="submit" className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700" > Delete </button>
        </form>
      </div>
    </article>
  );
}
