import { useEffect, useState } from "react";
import {
  type BalatroEngine,
  createBalatroEngine,
} from "../core/balatro-engine";
import { createPlayerManagerPlugin } from "../core/plugins/player-manager-plugin";
import { createEconomyManagerPlugin } from "../core/plugins/economy-manager-plugin";
import { createGamePlugin } from "../core/plugins/game-manager";
import { createAnteManagerPlugin } from "../core/plugins/blind-manager-plugin";
import { createDeckPlugin } from "../core/plugins/deck-manager-plugin";
import { createHandPlugin } from "../core/plugins/hand-manager-plugin";
import { createScorePlugin } from "../core/plugins";
import { createPoolManagerPlugin } from "../core/plugins/pool-manager-plugin";
import { createBuffonManagerPlugin } from "../core/plugins/buffons-manager-plugin";
import { createShopPlugin } from "../core/plugins/shop-plugin";
import { buffonsPlayer } from "../core/cards/buffons";
import { createConsumableManagerPlugin } from "../core/plugins/consumables-manager-plugin";
import { createHandScoreManagerPlugin } from "../core/plugins/hand-score-manager-plugin";
import { itemsPlayer } from "../core/cards/planets";
import { createEnhancementPlugin } from "../core/plugins/enhancement-plugin";
import { createSealPlugin } from "../core/plugins/seal-plugin";
import { createEditionPlugin } from "../core/plugins/edition-plugin";
import { enhancements } from "../core/cards/enhancements";
import { creatGoldSeal } from "../core/cards/seal";
import { createBaseEdition } from "../core/cards/editions";
import { createSeedManagerPlugin } from "../core/plugins/seed-manager-plugin";
import { createStatManagerPlugin } from "../core/plugins/stats-manager-plugin";
import { createDecksPlugin } from "../core/plugins/decks-manager-plugin";
import { decks } from "../core/decks/decks";
import { createShopPackPlugin } from "../core/plugins/shop-pack-plugin";
import { createScoreCommandManagerPlugin } from "../core/plugins/score-command-plugin";

export const useBalatroGame = () => {
  const [balatro, setBalatro] = useState<BalatroEngine | null>(null);

  useEffect(() => {
    const balatro = createBalatroEngine();

    const deckPlugin = createDeckPlugin();
    const handPlugin = createHandPlugin();
    const economyManagerPlugin = createEconomyManagerPlugin();
    const bliandManagerPlugin = createAnteManagerPlugin();
    const buffonManagerPlugin = createBuffonManagerPlugin();
    const itemsManagerPlugin = createConsumableManagerPlugin();
    const playerManagerPlugin = createPlayerManagerPlugin();
    const poolManagerPlugin = createPoolManagerPlugin();
    const shopPlugin = createShopPlugin();
    const gamePlugin = createGamePlugin();
    const scorePlugin = createScorePlugin();
    const handScoreManager = createHandScoreManagerPlugin();
    const enhancementManager = createEnhancementPlugin();
    const sealManager = createSealPlugin();
    const editionManager = createEditionPlugin();
    const seedManagerPlugin = createSeedManagerPlugin();
    const statManagerPlugin = createStatManagerPlugin();
    const decksManagerPlugin = createDecksPlugin();
    const shopPackPlugin = createShopPackPlugin();
    const scoreCommandPlugin = createScoreCommandManagerPlugin();

    poolManagerPlugin.registerBuffons(buffonsPlayer);
    poolManagerPlugin.registerItems(itemsPlayer);

    enhancementManager.registerEnhancements(enhancements);
    sealManager.registerSeal(creatGoldSeal());
    editionManager.registerEdition(createBaseEdition());
    decksManagerPlugin.addDecks(decks);

    balatro.registerPlugin(statManagerPlugin);
    balatro.registerPlugin(seedManagerPlugin);
    balatro.registerPlugin(playerManagerPlugin);
    balatro.registerPlugin(economyManagerPlugin);
    balatro.registerPlugin(handScoreManager);
    balatro.registerPlugin(deckPlugin);
    balatro.registerPlugin(handPlugin);
    balatro.registerPlugin(buffonManagerPlugin);
    balatro.registerPlugin(itemsManagerPlugin);
    balatro.registerPlugin(scorePlugin);
    balatro.registerPlugin(bliandManagerPlugin);
    balatro.registerPlugin(poolManagerPlugin);
    balatro.registerPlugin(shopPackPlugin);
    balatro.registerPlugin(shopPlugin);
    balatro.registerPlugin(enhancementManager);
    balatro.registerPlugin(decksManagerPlugin);
    balatro.registerPlugin(scoreCommandPlugin);

    balatro.registerPlugin(gamePlugin);

    seedManagerPlugin.setSeed("JL4365TK");

    setBalatro(balatro);
  }, []);

  return { balatro };
};
