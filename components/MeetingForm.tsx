"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createMeeting, updateMeeting } from "@/lib/actions";
import { initialState } from "@/lib/form-state";
import type { SacramentMeeting } from "@/lib/types";

type MeetingFormProps = {
  meeting?: SacramentMeeting;
};

export default function MeetingForm({
  meeting,
}: MeetingFormProps) {
  const isEditing = Boolean(meeting);

  const [speakers, setSpeakers] = useState(
    meeting?.speakers?.length
      ? meeting.speakers
      : [
          {
            name: "",
            topic: "",
            type: "speaker" as const,
          },
        ]
  );

  const [wardBusiness, setWardBusiness] = useState(
    meeting?.wardBusiness?.length
      ? meeting.wardBusiness
      : [
          {
            description: "",
          },
        ]
  );

  const [announcements, setAnnouncements] = useState(
    meeting?.announcements?.length
      ? meeting.announcements
      : [""]
  );


  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <div aria-live="polite" className="rounded-md bg-red-50 p-4 text-sm text-red-700" >
          {state.message}
        </div>
      )}
      {/* MEETING INFORMATION */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-primary">Meeting Information</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-2 block text-sm font-medium text-slate-700" >Date</label>
            <input id="date" name="date" type="date" defaultValue={meeting?.date ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2" /> 
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.date?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="meetingType" className="mb-2 block text-sm font-medium text-slate-700" > Meeting Type </label>
            <select id="meetingType" name="meetingType" defaultValue={meeting?.meetingType ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2" >
              <option value="" disabled>Select meeting type</option>
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
              <option value="special">Special</option>
            </select>
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.meetingType?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="presiding" className="mb-2 block text-sm font-medium text-slate-700" > Presiding </label>
            <input id="presiding" name="presiding" type="text" defaultValue={meeting?.presiding ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2" /> 
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.presiding?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="conducting" className="mb-2 block text-sm font-medium text-slate-700" > Conducting </label> 
            <input id="conducting" name="conducting" type="text" defaultValue={meeting?.conducting ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2" /> 
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.conducting?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ANNOUNCEMENTS */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-primary">Announcements</h2>
        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-5" >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-primary">Announcement {index + 1}</h3>
                {announcements.length > 1 && (
                  <button type="button" className="text-sm font-medium text-red-600 hover:text-red-800"
                    onClick={() => {
                      setAnnouncements((current) =>
                        current.filter(
                          (_, announcementIndex) =>
                            announcementIndex !== index
                        )
                      );
                    }}>Remove</button>
                )}
              </div>
              <label htmlFor={`announcement-${index}`} className="mb-2 block text-sm font-medium text-slate-700" > Announcement </label>               
              <input id={`announcement-${index}`} type="text" value={announcement} className="w-full rounded-md border border-slate-300 px-3 py-2"
                onChange={(event) => {
                  setAnnouncements((current) => {
                    const updated = [...current];
                  
                    updated[index] = event.target.value;
                  
                    return updated;
                  });
                }}/>
            </div>
          ))}
        </div>
        <button type="button" className="mt-6 rounded-md border border-primary px-4 py-2 font-medium text-primary transition hover:bg-primary hover:text-white"
          onClick={() => {
            setAnnouncements((current) => [
              ...current,
              "",
            ]);
          }}>+ Add Announcement</button>
        <input type="hidden" name="announcements" value={JSON.stringify(announcements)} readOnly /> 
        <div id="announcements-error" aria-live="polite" className="mt-2 text-sm text-red-600" >
          {state.errors?.announcements?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </section>
      {/* OPENING */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-primary">Opening</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="openingHymnNumber" className="mb-2 block text-sm font-medium text-slate-700" > Opening Hymn Number </label>
            <input id="openingHymnNumber" name="openingHymnNumber" type="number" min="1" defaultValue={meeting?.openingHymn?.number ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2" /> 
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.openingHymnNumber?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="openingHymnTitle" className="mb-2 block text-sm font-medium text-slate-700" > Opening Hymn Title </label> 
            <input id="openingHymnTitle" name="openingHymnTitle" type="text" defaultValue={meeting?.openingHymn?.title ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2" /> 
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.openingHymnTitle?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="openingPrayer" className="mb-2 block text-sm font-medium text-slate-700" > Opening Prayer </label> 
          <input id="openingPrayer" name="openingPrayer" type="text" defaultValue={meeting?.openingPrayer ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          <div className="mt-1 text-sm text-red-600">
            {state.errors?.openingPrayer?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
      </section>
      {/* WARD BUSINESS */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-primary">Ward Business</h2>
        <div className="space-y-6">
          {wardBusiness.map((item, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-5" >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-primary"> Business Item {index + 1} </h3> 
                {wardBusiness.length > 1 && (
                  <button type="button" className="text-sm font-medium text-red-600 hover:text-red-800"
                    onClick={() => {
                      setWardBusiness((current) =>
                        current.filter(
                          (_, itemIndex) =>
                            itemIndex !== index
                        )
                      );
                    }} >Remove</button>
                )}
              </div>
              <label htmlFor={`ward-business-${index}`} className="mb-2 block text-sm font-medium text-slate-700" > Description </label> 
              <input id={`ward-business-${index}`} type="text" value={item.description} className="w-full rounded-md border border-slate-300 px-3 py-2"
                onChange={(event) => {
                  setWardBusiness((current) => {
                    const updated = [...current];

                    updated[index] = {
                      ...updated[index],
                      description: event.target.value,
                    };

                    return updated;
                  });
                }}/>
            </div>
          ))}
        </div>
        <button type="button" className="mt-6 rounded-md border border-primary px-4 py-2 font-medium text-primary transition hover:bg-primary hover:text-white"
          onClick={() => {
            setWardBusiness((current) => [
              ...current,
              {
                description: "",
              },
            ]);
          }}>+ Add Ward Business</button>
        <input type="hidden" name="wardBusiness" value={JSON.stringify(wardBusiness)} readOnly /> 
        <div className="mt-2 text-sm text-red-600">
          {state.errors?.wardBusiness?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </section>
      {/* STAKE BUSINESS */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-primary">Stake Business</h2>
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-slate-700">Is there stake business?</legend>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="stakeBusiness" value="true" defaultChecked={meeting?.stakeBusiness === true} />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="stakeBusiness" value="false" defaultChecked={meeting?.stakeBusiness !== true} />
              No
            </label>
          </div>
          <div className="mt-2 text-sm text-red-600">
            {state.errors?.stakeBusiness?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </fieldset>
      </section>
      {/* SACRAMENT */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-primary">Sacrament</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="sacramentHymnNumber" className="mb-2 block text-sm font-medium text-slate-700" > Sacrament Hymn Number </label> 
            <input id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" min="1" className="w-full rounded-md border border-slate-300 px-3 py-2"
              defaultValue={
                meeting?.sacramentHymn?.number ?? ""
              }/>
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.sacramentHymnNumber?.map(
                (error) => (
                  <p key={error}>{error}</p>
                )
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="sacramentHymnTitle" className="mb-2 block text-sm font-medium text-slate-700" > Sacrament Hymn Title </label> 
            <input id="sacramentHymnTitle" name="sacramentHymnTitle" type="text" className="w-full rounded-md border border-slate-300 px-3 py-2"
              defaultValue={
                meeting?.sacramentHymn?.title ?? ""
              }/>
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.sacramentHymnTitle?.map(
                (error) => (
                  <p key={error}>{error}</p>
                )
              )}
            </div>
          </div>
        </div>
      </section>
      {/* SPEAKERS */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-primary">Speakers</h2>
        <div className="space-y-6">
          {speakers.map((speaker, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-5" >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-primary">Speaker {index + 1}</h3>
                {speakers.length > 1 && (
                  <button type="button" className="text-sm font-medium text-red-600 hover:text-red-800"
                    onClick={() => {
                      setSpeakers((current) =>
                        current.filter(
                          (_, speakerIndex) =>
                            speakerIndex !== index
                        )
                      );
                    }}>Remove</button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor={`speaker-name-${index}`} className="mb-2 block text-sm font-medium text-slate-700" > Name </label>
                  <input id={`speaker-name-${index}`} type="text" value={speaker.name} className="w-full rounded-md border border-slate-300 px-3 py-2"
                    onChange={(event) => {
                      setSpeakers((current) => {
                        const updated = [...current];

                        updated[index] = {
                          ...updated[index],
                          name: event.target.value,
                        };

                        return updated;
                      });
                    }}/>
                </div>
                <div>
                  <label htmlFor={`speaker-topic-${index}`} className="mb-2 block text-sm font-medium text-slate-700" > Topic </label> 
                  <input id={`speaker-topic-${index}`} type="text" value={speaker.topic} className="w-full rounded-md border border-slate-300 px-3 py-2"
                    onChange={(event) => {
                      setSpeakers((current) => {
                        const updated = [...current];

                        updated[index] = {
                          ...updated[index],
                          topic: event.target.value,
                        };

                        return updated;
                      });
                    }}/>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor={`speaker-type-${index}`} className="mb-2 block text-sm font-medium text-slate-700" > Type </label> 
                <select id={`speaker-type-${index}`} value={speaker.type} className="w-full rounded-md border border-slate-300 px-3 py-2"
                  onChange={(event) => {
                    setSpeakers((current) => {
                      const updated = [...current];

                      updated[index] = {
                        ...updated[index],
                        type: event.target.value as
                          | "speaker"
                          | "musical-number",
                      };

                      return updated;
                    });
                  }}>
                    <option value="speaker">Speaker</option>
                    <option value="musical-number">Musical Number</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="mt-6 rounded-md border border-primary px-4 py-2 font-medium text-primary transition hover:bg-primary hover:text-white"
          onClick={() => {
            setSpeakers((current) => [
              ...current,
              {
                name: "",
                topic: "",
                type: "speaker" as const,
              },
            ]);
          }}>+ Add Speaker</button>
        <input type="hidden" name="speakers" value={JSON.stringify(speakers)} readOnly />
        <div className="mt-2 text-sm text-red-600">
          {state.errors?.speakers?.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </section>
      {/* CLOSING */}
      <section className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-xl font-bold text-primary">Closing</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="closingHymnNumber" className="mb-2 block text-sm font-medium text-slate-700" > Closing Hymn Number </label>
            <input id="closingHymnNumber" name="closingHymnNumber" type="number" min="1" defaultValue={ meeting?.closingHymn?.number ?? "" } className="w-full rounded-md border border-slate-300 px-3 py-2"/>
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.closingHymnNumber?.map(
                (error) => (
                  <p key={error}>{error}</p>
                )
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="closingHymnTitle" className="mb-2 block text-sm font-medium text-slate-700" > Closing Hymn Title </label>
            <input id="closingHymnTitle" name="closingHymnTitle" type="text" defaultValue={ meeting?.closingHymn?.title ?? "" } className="w-full rounded-md border border-slate-300 px-3 py-2" /> 
            <div className="mt-1 text-sm text-red-600">
              {state.errors?.closingHymnTitle?.map(
                (error) => (
                  <p key={error}>{error}</p>
                )
              )}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="closingPrayer" className="mb-2 block text-sm font-medium text-slate-700" > Closing Prayer </label> 
          <input id="closingPrayer" name="closingPrayer" type="text" defaultValue={meeting?.closingPrayer ?? ""} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          <div className="mt-1 text-sm text-red-600">
            {state.errors?.closingPrayer?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
      </section>
      {/* BUTTONS */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
        <Link href="/meetings" className="rounded-md border border-slate-300 px-6 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-100" > Cancel </Link> 
        <button type="submit" disabled={isPending} className="rounded-md bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50" >
          {isPending
            ? isEditing
              ? "Saving Changes..."
              : "Creating Meeting..."
            : isEditing
              ? "Save Changes"
              : "Create Meeting"}
        </button>
      </div>
    </form>
  );
}
