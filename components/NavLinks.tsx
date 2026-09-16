"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isMeetingsActive =
    pathname === "/meetings" ||
    pathname.startsWith("/meetings/");

  const isCurrentActive = pathname === "/meetings/current";

  return (
    <nav className="flex flex-wrap justify-center gap-2">
      <Link href="/" className={`rounded-md px-3 py-2 font-medium transition ${   isHomeActive     ? "bg-secondary text-white"     : "hover:bg-secondary" }`}>Home</Link>
      <Link  href="/meetings"  className={`rounded-md px-3 py-2 font-medium transition ${    isMeetingsActive && !isCurrentActive      ? "bg-secondary text-white" : "hover:bg-secondary"}`}>Meetings</Link>
      <Link href="/meetings/current" className={`rounded-md px-3 py-2 font-medium transition ${   isCurrentActive     ? "bg-secondary text-white"     : "hover:bg-secondary" }`}>Current Meeting</Link>
    </nav>
  );
}