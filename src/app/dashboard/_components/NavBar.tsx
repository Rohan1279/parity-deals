import { BrandLogo } from "@/components/Brandlogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header className="flex py-4 shadow bg-background">
      <nav className="flex items-center gap-10 container">
        <Link className="mr-auto" href="/dashboard">
          <BrandLogo />
        </Link>
        <Link href="/dashboard/products" className="capitalize">
          products
        </Link>
        <Link href="/dashboard/analytics" className="capitalize">
          analytics
        </Link>
        <Link href="/dashboard/subscription" className="capitalize">
          subscription
        </Link>
        <UserButton />
      </nav>
    </header>
  );
};

export default NavBar;
