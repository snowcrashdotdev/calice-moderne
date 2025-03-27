import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import api from "~/api"

export async function loader() {
  const res = await api.tournaments.$get()

  if (res.ok) return (await res.json())

  return []
}


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome tournaments={loaderData} />;
}
