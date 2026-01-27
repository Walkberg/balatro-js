import { type PokerCard as IPokerCard } from "../../core/cards/poker-cards";
import { PokerCardSlot } from "./PokerCardSlot";

interface PlayCardsProps {
  pokerCards: IPokerCard[];
  onSelectCard?: (card: IPokerCard) => void;
  selectedCards?: string[];
  bottomComponent?: React.ReactNode;
  scaleFactor?: number;
}

export const PlayCards = ({
  pokerCards,
  onSelectCard,
  selectedCards,
  bottomComponent,
  scaleFactor,
}: PlayCardsProps) => {
  return (
    <div className="relative flex justify-between shrink h-full w-full ">
      {pokerCards.map((card, index) => (
        <PokerCardSlot
          key={card.id}
          card={card}
          onSelectCard={() => onSelectCard?.(card)}
          selected={selectedCards?.includes(card.id)}
          bottomComponent={bottomComponent}
          scaleFactor={scaleFactor}
        />
      ))}
    </div>
  );
};
