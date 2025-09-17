import Image from "next/image";

export default function Home() {
  const linkedinUrl = "https://www.linkedin.com/in/sébastien-legros-23a85085";
  const githubUrl = "https://github.com/slg9";
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-[32px]">
          <Image
          className="rounded-full border-2 border-gray-300 shadow-md m-auto"
            src="/sebastien.jpeg"
            alt="Profile picture"
            width={300}
            height={300}
          />
          <h1 className="text-4xl font-bold">Hello, I'm Sébastien Legros</h1>
          <p className="text-lg">I'm a software engineer</p>
        </div>
      </main>
      <footer className="row-start-4 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.png"
            alt="Linkedin icon"
            width={16}
            height={16}
          />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.png"
            alt="Github icon"
            width={16}
            height={16}
          />

        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:sebastien@neitsa.fr"
        >
          <Image
            aria-hidden
            src="/gmail.png"
            alt="Gmail icon"
            width={16}
            height={16}
          />

        </a>
      </footer>
    </div>
  );
}
