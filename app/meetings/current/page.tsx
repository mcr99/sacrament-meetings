import type { SacramentMeeting } from "@/lib/types";
import { redirect } from "next/navigation";

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.BASE_URL;

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

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();

  if (!meetings || meetings.length === 0) {
    redirect("/meetings");
  }

  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  const sundayDate = sunday.toISOString().split("T")[0];

  let currentMeeting = meetings.find((meeting) => meeting.date === sundayDate);

  if (!currentMeeting) {
    const sortedMeetings = [...meetings].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    currentMeeting = sortedMeetings[0];
  }

  redirect(`/meetings/${currentMeeting.id}`);
}
