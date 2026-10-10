"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from "./meetings-db";
import type { MeetingType } from "./types";
import type { State } from "./form-state";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";



const MeetingFormSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required."),

  meetingType: z.enum(
    ["testimony", "regular", "stake", "general", "special"] as [
      MeetingType,
      ...MeetingType[]
    ],
    {
      message: "Please select a meeting type.",
    }
  ),

  presiding: z
    .string()
    .trim()
    .min(1, "Presiding is required."),

  conducting: z
    .string()
    .trim()
    .min(1, "Conducting is required."),

  openingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Opening hymn number must be greater than 0."),

  openingHymnTitle: z
    .string()
    .trim()
    .min(1, "Opening hymn title is required."),

  openingPrayer: z
    .string()
    .trim()
    .min(1, "Opening prayer is required."),

  sacramentHymnNumber: z.coerce
    .number()
    .int()
    .positive("Sacrament hymn number must be greater than 0."),

  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, "Sacrament hymn title is required."),

  closingHymnNumber: z.coerce
    .number()
    .int()
    .positive("Closing hymn number must be greater than 0."),

  closingHymnTitle: z
    .string()
    .trim()
    .min(1, "Closing hymn title is required."),

  closingPrayer: z
    .string()
    .trim()
    .min(1, "Closing prayer is required."),

  announcements: z.string().optional(),

  wardBusiness: z.string().optional(),

  stakeBusiness: z.enum(["true", "false"]),

  speakers: z.string().optional(),
});


function parseOptionalJsonArray<T>(
  value: string | undefined
): T[] | undefined {
  if (!value || value.trim() === "") {
    return undefined;
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return undefined;
    }

    return parsed as T[];
  } catch {
    return undefined;
  }
}

function getFormValues(formData: FormData) {
  return {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),

    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),

    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),

    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),

    announcements: formData.get("announcements"),
    wardBusiness: formData.get("wardBusiness"),
    stakeBusiness: formData.get("stakeBusiness"),
    speakers: formData.get("speakers"),
  };
}

function buildMeetingData(data: z.infer<typeof MeetingFormSchema>) {
  const announcements =
    parseOptionalJsonArray<string>(data.announcements) ?? [];


  const wardBusiness = parseOptionalJsonArray<{
    description: string;
  }>(data.wardBusiness);

  const speakers = parseOptionalJsonArray<{
    name: string;
    topic: string;
    type: "speaker" | "musical-number";
  }>(data.speakers);

  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,

    announcements,

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },

    openingPrayer: data.openingPrayer,

    wardBusiness: wardBusiness ?? [],

    stakeBusiness: data.stakeBusiness === "true",

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    speakers: speakers ?? [],

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },

    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireAdmin();
  const validatedFields = MeetingFormSchema.safeParse(
    getFormValues(formData)
  );

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
  const meetingData = buildMeetingData(
    validatedFields.data
  );

  console.log("MEETING DATA TO SAVE:", meetingData);

  const createdMeeting = await addMeeting(meetingData);

  console.log("MEETING CREATED:", createdMeeting);

  revalidatePath("/meetings");
} catch (error) {
  console.error("Failed to create meeting:", error);

  return {
    message: "Something went wrong while creating the meeting.",
    errors: {},
  };
}


  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireAdmin();
  const validatedFields = MeetingFormSchema.safeParse(
    getFormValues(formData)
  );

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const meeting = await updateMeetingInDb(
      id,
      buildMeetingData(validatedFields.data)
    );

    if (!meeting) {
      return {
        message: "Meeting not found.",
        errors: {},
      };
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
  } catch (error) {
    console.error("Failed to update meeting:", error);

    return {
      message: "Something went wrong while updating the meeting.",
      errors: {},
    };
  }

  redirect("/meetings");
}

export async function deleteMeeting(id: number): Promise<void> {
  await requireAdmin();
  try {
    const deleted = await deleteMeetingInDb(id);

    if (!deleted) {
      throw new Error("Meeting not found.");
    }

    revalidatePath("/meetings");
  } catch (error) {
    console.error("Failed to delete meeting:", error);

    throw new Error(
      "Unable to delete the meeting. Please try again."
    );
  }

  redirect("/meetings");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/meetings/new",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return "Invalid username or password.";
      }

      return "Something went wrong. Please try again.";
    }

    throw error;
  }
}

async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }
}