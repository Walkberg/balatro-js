import { useEffect, useState } from "react";
import { useCurrentGame } from "../../components/BalatroProvider";
import { type BuffonsManagerPlugin } from "../../core/plugins";
import { type BuffonCard } from "../../core/cards/buffons";

export function useBuffonManager() {
  const { balatro } = useCurrentGame();

  const [buffons, setBuffons] = useState<BuffonCard[]>([]);

  const buffonManager =
    balatro?.getPlugin<BuffonsManagerPlugin>("buffon-manager");

  useEffect(() => {
    if (balatro == null) {
      return;
    }
    const buffonManager =
      balatro?.getPlugin<BuffonsManagerPlugin>("buffon-manager");

    if (buffonManager == null) {
      return;
    }

    balatro.onEvent("buffon-added", () => {
      setBuffons(buffonManager.getBuffons());
    });

    balatro.onEvent("buffon-removed", () => {
      setBuffons(buffonManager.getBuffons());
    });
  }, [balatro, buffonManager]);

  if (buffonManager == null) {
    return null;
  }

  return { buffons, buffonManager };
}
