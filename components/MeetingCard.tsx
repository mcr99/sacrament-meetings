import type { SacramentMeeting } from "@/lib/types";
import Link from "next/link";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-primary">
          {meeting.date}
        </h2>

        <p className="mt-1 text-sm capitalize text-secondary">
          {meeting.meetingType} Meeting
        </p>
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
      <Link href={`/meetings/${meeting.id}`} className="mt-4 inline-block rounded-md bg-secondary px-4 py-2 font-medium text-white transition hover:bg-accent"> View Details </Link>
    </article>
  );
}