import '@/styles/globals.css';
import Image from 'next/image';
import WrappedLink from '@/components/WrappedLink/WrappedLink';

export default function Page() {
  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
          />
          <ul className="list-inside list-disc text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              To enable native app context detection, add {" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                app/mobile
              </code>
              to your native web view&#39;s user-agent string.
            </li>
            <li className="tracking-[-.01em]">
              Once enabled, the link below will use the Next.js router on web, but not from a native web view. This allows the native app to intercept link navigation.
            </li>
          </ul>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <WrappedLink
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center gap-2 justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                href={"/about"}>
              <Image
                  className="dark:invert"
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
              />
              This is a wrapped link to the about page.
            </WrappedLink>
          </div>
        </main>
      </div>
  );
}
