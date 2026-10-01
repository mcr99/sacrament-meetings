import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const query = searchParams.get("query") ?? "";
  const date = searchParams.get("date");

  const pageValue = Number(searchParams.get("page"));
  const currentPage =
    Number.isInteger(pageValue) && pageValue > 0
      ? pageValue
      : 1;

  const meetings = await getMeetings(
    query,
    currentPage,
    date
  );

  return Response.json(meetings);
}
