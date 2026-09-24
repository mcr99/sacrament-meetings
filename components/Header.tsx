import NavLinks from "@/components/NavLinks";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-200">Barcenas 1</p>
          <h1 className="text-2xl font-bold">Sacrament Meeting Planner</h1>
          <p className="mt-1 text-sm text-slate-200">{currentDate}</p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}