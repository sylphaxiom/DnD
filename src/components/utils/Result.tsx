// import * as React from "react";

import type { Route } from "./+types/Result";
export { searchParamsLoader as clientLoader } from "./searchParams";

export default function Result({ loaderData }: Route.ComponentProps) {
  return <div>{JSON.stringify(loaderData)}</div>;
}
