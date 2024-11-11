import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const PageWithBackButton = ({
  backButtonHref,
  pageTitle,
  children,
}: {
  backButtonHref: string;
  pageTitle: string;
  children: ReactNode;
}) => {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-8">
      <Button size="icon" className="rounded-full" variant={"outline"} asChild>
        <Link href={backButtonHref}>
          <div className="sr-only">Back</div>
          <ArrowLeft className="size-8" />
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold self-center">{pageTitle}</h1>
      <div className="col-start-2">{children}</div>
    </div>
  );
};

export default PageWithBackButton;
