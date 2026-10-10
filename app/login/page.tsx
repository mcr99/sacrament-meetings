import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to manage the sacrament meeting schedule for Barcenas 1 Ward.",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-primary">
          Sign In
        </h1>

        <p className="mt-2 text-slate-600">
          Sign in to manage sacrament meetings for Barcenas 1 Ward.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}