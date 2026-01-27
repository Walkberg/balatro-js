import { useEffect, useState } from "react";
import {
  type Consumable,
  type ConsumablesManagerPlugin,
} from "../../core/plugins";
import { useCurrentGame } from "../../components/BalatroProvider";

export function useConsumableManager() {
  const { balatro } = useCurrentGame();

  const consumableManager = balatro?.getPlugin<ConsumablesManagerPlugin>(
    "consumables-manager",
  );

  const [consumables, setConsumable] = useState<Consumable[]>([]);

  useEffect(() => {
    if (balatro == null) {
      return;
    }
    if (consumableManager == null) {
      return;
    }
    balatro.onEvent("consumable-added", () =>
      setConsumable(consumableManager.getConsumables()),
    );
    balatro.onEvent("consumable-removed", () =>
      setConsumable(consumableManager.getConsumables()),
    );
  }, [balatro]);

  return { consumableManager, consumables };
}
