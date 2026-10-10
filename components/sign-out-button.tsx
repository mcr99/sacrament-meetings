import { signOut } from "@/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-white px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-primary"
      >
        Sign Out
      </button>
    </form>
  );
}