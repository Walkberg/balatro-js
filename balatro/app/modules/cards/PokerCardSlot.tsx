import { type PokerCard as ICard } from "../../core/cards/poker-cards";
import { type ReactNode } from "react";

interface PokerCardSlotProps {
  card: ICard;
  onSelectCard?: () => void;
  selected?: boolean;
  bottomComponent?: ReactNode;
  scaleFactor?: number;
}

export const PokerCardSlot = ({}: PokerCardSlotProps) => {
  return <div className="bg-green-200">PokerCardSlot</div>;
};
