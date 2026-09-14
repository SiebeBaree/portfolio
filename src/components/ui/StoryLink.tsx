"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useCloudNavigate } from "@/components/transition/CloudTransition";

/** Keep native link behavior for new tabs while using the site's cloud transition. */
export default function StoryLink({
  href,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href" | "onClick"> & { href: string }) {
  const navigate = useCloudNavigate();
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank"
        )
          return;
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
