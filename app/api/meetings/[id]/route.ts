import { getMeetingById } from "@/lib/meetings-db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  const { id } = await context.params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    return Response.json(
      { message: "Invalid meeting ID." },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return Response.json(
      { message: "Meeting not found." },
      { status: 404 }
    );
  }

  return Response.json(meeting);
}