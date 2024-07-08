import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

import navs from "./nav.config.json";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-12">
      <div className="flex items-center gap-x-12">
        <Link href="/">
          <span className="text-lg font-black text-transparent/60 transition-colors hover:text-transparent/100">
            UI Builder
          </span>
        </Link>
        <nav className="flex items-center gap-x-12">
          {navs.map(({ href, title }) => (
            <Link key={href} href={href} className="semibold">
              <span className="text-sm font-medium text-transparent/80 hover:text-transparent/100">
                {title}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <SignedOut>
          <Button variant="link" asChild>
            <SignInButton mode="modal" />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
        </SignedIn>
      </div>
    </header>
  );
}
