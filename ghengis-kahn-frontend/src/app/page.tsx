import Image from "next/image";

export default function Home() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white p-8"
      style={{ backgroundImage: "url('/backdrop.png')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <header className="relative text-center mb-16 z-10">
        <h1 className="text-5xl sm:text-7xl font-bold mb-4">Ghengis Kahn AI</h1>
        <p className="text-lg sm:text-xl">Embark on a journey through the digital frontier.</p>
      </header>

      <main className="relative flex flex-col items-center gap-16 z-10">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <section className="bg-black/70 text-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-semibold mb-4">Roadmap</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Phase 1: Initial Token Launch</li>
            <li>Phase 2: Feature Expansion</li>
            <li>Phase 3: Community Building</li>
            <li>Phase 4: Global Domination</li>
          </ol>
        </section>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-800 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-white/20 transition-colors flex items-center justify-center hover:bg-white/10 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className="relative mt-16 text-center z-10">
        <p className="text-sm">© 2023 Ghengis Kahn. All rights reserved.</p>
      </footer>
    </div>
  );
}
