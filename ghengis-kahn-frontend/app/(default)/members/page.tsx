"use client";

import Header from "../../../components/ui/header";
import TerminalBot from "../../../components/TerminalBot";

export default function MembersPage() {
  return (
    <>
      {/* Header at the top */}
      <Header />

      {/* Main Content */}
      <main className="pt-32 pb-16 md:pt-52 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="h1 mb-8 text-slate-200">Membership Overview</h1>
          <p className="text-lg text-slate-300 mb-6">
            Welcome to the $KAHN Membership page. Here, you can learn more about
            our exclusive benefits and how to get involved in our community.
          </p>
          <p className="text-lg text-slate-300 mb-6">
            Join the horde of crypto developers and enthusiasts to build the best
            crypto AI and learning experience possible!
          </p>
          {/* Terminal Bot Component */}
          <TerminalBot />
        </div>
      </main>
    </>
  );
}
