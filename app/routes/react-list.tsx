import type { Route } from "./+types/home";
import { ReactList } from "~/components/react-list-page/react-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function ReactListPage() {
  return <ReactList />;
}