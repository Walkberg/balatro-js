import { Balatro } from "app/components/BalatroPage";
import type { Route } from "./+types/home";
import { BalatroProvider } from "app/components/BalatroProvider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <BalatroProvider seed={"546"}>
      <Balatro />
    </BalatroProvider>
  );
}
