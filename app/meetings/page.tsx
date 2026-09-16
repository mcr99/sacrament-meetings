import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";

export const dynamic = "force-dynamic";

function getBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  return "http://localhost:3000";
}

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    throw new Error("BASE_URL is not configured.");
  }

  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meetings.");
  }

  return response.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <main>
      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </main>
  );
}