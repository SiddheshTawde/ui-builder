import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

import navs from "./nav.config.json";

import Link from "next/link";

export default function Header() {
  return (
    <header className="container mx-auto flex h-16 w-full items-center justify-between border-b px-8">
      <div className="flex items-center gap-x-12">
        <Button
          variant="link"
          className="px-0 text-lg font-black text-transparent/60 transition-colors hover:text-transparent/100"
          asChild
        >
          <Link href="/">UI Builder</Link>
        </Button>
        <nav className="flex items-center">
          {navs.map(({ href, title }) => (
            <Button
              key={href}
              variant="link"
              className="text-sm font-medium text-transparent/80 hover:text-transparent/100"
              asChild
            >
              <Link href={href} className="semibold">
                {title}
              </Link>
            </Button>
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
