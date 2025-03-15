import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import api from "~/api"

export async function loader() {
  const req  = await api.tournaments.$get()
  if (req.ok) {
    const list = await req.json()

    return list
  }

  return undefined
}


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({loaderData}: Route.ComponentProps) {
  return <Welcome api={loaderData?.list ?? ""} />;
}
