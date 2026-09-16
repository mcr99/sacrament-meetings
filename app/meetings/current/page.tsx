import type { SacramentMeeting } from "@/lib/types";
import { redirect } from "next/navigation";

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not configured.");
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

  // 1. Calcular la fecha del domingo de la semana actual (YYYY-MM-DD)
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  const sundayDate = sunday.toISOString().split("T")[0];

  // 2. Buscar si hay una reunión agendada exactamente para este domingo
  let currentMeeting = meetings.find((meeting) => meeting.date === sundayDate);

  // 3. Respaldo inteligente: si no existe la reunión de hoy, ordenar por fecha descendente
  //    (de la más reciente a la más antigua) y tomar la más reciente.
  if (!currentMeeting) {
    const sortedMeetings = [...meetings].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    currentMeeting = sortedMeetings[0];
  }

  redirect(`/meetings/${currentMeeting.id}`);
}