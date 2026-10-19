import { ViewTransition, type ReactNode } from "react";

/** Wraps a route's content so navigations crossfade and rise between pages. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <main id="main">{children}</main>
    </ViewTransition>
  );
}
