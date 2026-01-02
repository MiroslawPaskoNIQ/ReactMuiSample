import type { Route } from "./+types/home";
import { MuiList } from "../components/mui-list-page/mui-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MuiListPage() {
  return <MuiList />;
}