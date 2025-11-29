// import * as React from "react";
import type { Route } from "./+types/Result";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const query = decodeURI(url.search);
  const bits = query.slice(1).split("&");
  let params: { [key: string]: string } = {};
  bits.forEach((v) => {
    const pair = v.split("=");
    params[pair[0]] = pair[1];
  });
  return params;
}

export default function Result({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return <div>{JSON.stringify(loaderData)}</div>;
}
