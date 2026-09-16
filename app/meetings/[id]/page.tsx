import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function getBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  if (process.env.BASE_URL) {
    return process.env.BASE_URL.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getMeetingById(id: string): Promise<SacramentMeeting | null> {
  const baseUrl = getBaseUrl();

  if (!baseUrl) {
    throw new Error("BASE_URL is not configured.");
  }

  const response = await fetch(`${baseUrl}/api/meetings/${id}`, {
    cache: "no-store",
    headers: {
      "Accept": "application/json",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting detail.");
  }

  return response.json();
}

export default async function MeetingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}