import type { SacramentMeeting } from "@/lib/types";

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-md">
      <header className="mb-6 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-primary">
          Sacrament Meeting
        </h1>
        <p className="mt-2 text-lg font-medium text-secondary"> {meeting.date} </p>
        <p className="mt-1 text-sm capitalize text-slate-500">  {meeting.meetingType} Meeting</p>
      </header>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-bold text-primary"> Meeting Leadership </h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Presiding:</span>{" "}
            {meeting.presiding}
          </p>
          <p>
            <span className="font-semibold">Conducting:</span>{" "}
            {meeting.conducting}
          </p>
        </div>
      </section>
      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold text-primary">Announcements</h2>
          <ul className="list-disc space-y-1 pl-5">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-bold text-primary"> Opening </h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Opening Hymn:</span>{" "}
            #{meeting.openingHymn.number} — {meeting.openingHymn.title}
          </p>
          <p>
            <span className="font-semibold">Opening Prayer:</span>{" "}
            {meeting.openingPrayer}
          </p>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-bold text-primary"> Ward Business </h2>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No ward business.</p>
        )}
        <p className="mt-3">
          <span className="font-semibold">Stake Business:</span>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-bold text-primary"> Sacrament </h2>
        <p>
          <span className="font-semibold">Sacrament Hymn:</span>{" "}
          #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-3 text-xl font-bold text-primary">Speakers and Musical Numbers</h2>
        <div className="space-y-3">
          {meeting.speakers.map((item, index) => (
            <div key={index} className="rounded-md bg-slate-50 p-4" >
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm capitalize text-secondary">{item.type}</p>
              {item.topic && (
                <p className="mt-1 text-sm">
                  <span className="font-medium">Topic:</span>{" "}
                  {item.topic}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-bold text-primary">Closing</h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Closing Hymn:</span>{" "}
            #{meeting.closingHymn.number} — {meeting.closingHymn.title}
          </p>
          <p>
            <span className="font-semibold">Closing Prayer:</span>{" "}
            {meeting.closingPrayer}
          </p>
        </div>
      </section>
    </article>
  );
}