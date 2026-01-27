import { type PlanetCard } from "../balatro";
import { type BalatroEngine } from "../balatro-engine";
import { type BuffonCard } from "./buffons";
import { type PokerCardPack } from "./packs";
import { type PokerCard } from "./poker-cards";
import { type TarotCard } from "./tarots";

export type CardType = "planet" | "tarot" | "pack" | "spectral" | "poker";

export type ConsumableType = "planet" | "tarot" | "pack" | "spectral";

export interface Buyable {
  getBuyPrice: () => number;
}

export interface Sellable {
  getSellPrice: () => number;
}

export interface Useable {
  checkCanUse?: (ctx: BalatroEngine) => boolean;
  onConsumableUsed?: (ctx: BalatroEngine) => void;
}

export function isBuyable(obj: any): obj is Buyable {
  return obj && typeof obj.getBuyPrice === "function";
}

export function isSellable(obj: any): obj is Sellable {
  return obj && typeof obj.getSellPrice === "function";
}

export function isUseable(obj: any): obj is Useable {
  return obj && typeof obj.getBuyPrice === "function";
}

export type Items =
  | PlanetCard
  | TarotCard
  | SpectralCard
  | PokerCard
  | BuffonCard
  | PokerCardPack;

export type SpectralCard = {
  id: string;
  name: string;
  type: "spectral";
  description: string;
  configId: string;
} & Buyable &
  Useable &
  Sellable;

export type VoucherCard = {
  id: string;
  name: string;
  type: "voucher";
  description: string;
  configId: string;
} & Buyable;
