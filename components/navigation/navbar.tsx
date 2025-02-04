"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { UserDropdown } from "@/components/UserDropdown";
import Link from "next/link";
import { Business, Startup } from "@prisma/client";
import { cn } from "@/lib/utils";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  const userDropDownProps = {
    type: user?.type as "BUSINESS" | "STARTUP",
    image: user?.image,
    business: user?.business as Business,
    startup: user?.startup as Startup,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    name: user?.name,
  };

  return (
    <header className="sticky top-0 z-40 bg-base-white px-4 py-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full">
      <nav className={cn("flex items-center justify-between", className)}>
        <div className="shrink-0 lg:w-48 cursor-pointer">
          <Link href="/home">
            <Image
              src="/logo-black.webp"
              width={71}
              height={32}
              alt="visey logo"
            />
          </Link>
        </div>

        <div className="flex px-8 flex-1 justify-center">
          {user?.type === "BUSINESS" && !user.business && (
            <Link
              href="/list-business"
              className="text-center text-linkBlue md:hidden"
            >
              List Business Free
            </Link>
          )}
          {user?.type === "BUSINESS" && user.business && (
            <Link
              href="/promote-business"
              className="text-center text-linkBlue md:hidden"
            >
              Promote
            </Link>
          )}
          {user?.type === "STARTUP" && !user.startup && (
            <Link
              href="/basic-startup-details"
              className="text-center text-linkBlue md:hidden"
            >
              Add Startup Details
            </Link>
          )}

          <div className="hidden lg:block w-full">
            <form onSubmit={handleSearchSubmit} className="relative shadow-inner w-[30rem] xl:w-[40rem]">
              <Input
                className="flex-1 pr-10 border-none py-6 bg-white"
                type="text"
                placeholder="Type to Search.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
              </span>
            </form>
          </div>
        </div>

        <div className="flex gap-x-6 items-center">
          {user?.type === "STARTUP" && !user.startup && (
            <Link href="/basic-startup-details">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                Add Startup Details
              </Button>
            </Link>
          )}
          {user?.type === "BUSINESS" && (
            <Link href="/promote-business">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                Promote
              </Button>
            </Link>
          )}
          {user?.type === "BUSINESS" && !user?.business && (
            <Link href="/list-business">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                List Business Free
              </Button>
            </Link>
          )}

          <div className="flex gap-1 sm:gap-4 items-center">
            <div>
              <NotificationsDropdown />
            </div>
            <div>
              <UserDropdown user={userDropDownProps} />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mt-4 shadow-inner lg:hidden">
        <form onSubmit={handleSearchSubmit}>
          <Input
            className="flex-1 pr-10 border-none py-6 bg-white"
            type="text"
            placeholder="Type to Search.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
          </span>
        </form>
      </div>
    </header>
  );
}
