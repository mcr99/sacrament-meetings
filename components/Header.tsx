import NavLinks from "@/components/NavLinks";
import { auth } from "@/auth";
import { SignOutButton } from "@/components/sign-out-button";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="block">
            <p className="text-sm font-medium text-slate-200">Barcenas 1</p>
            <span className="text-2xl font-bold">Sacrament Meeting Planner</span>
          </Link>
          <p className="mt-1 text-sm text-slate-200">{currentDate}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <NavLinks />
          {session?.user ? (
            <SignOutButton />
          ) : (
            <Link href="/login" className="rounded-lg border border-white px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-primary" >Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}