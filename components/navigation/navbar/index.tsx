import Image from "next/image";
import Link from "next/link";
import React from "react";

import Theme from "@/components/navigation/navbar/Theme";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          alt="DevFlowLogo"
          width={23}
          height={23}
        />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <p>Global Seacrh</p>

      <div className="flex-between gap-5">
        <Theme />
      </div>
    </nav>
  );
};
export default Navbar;
