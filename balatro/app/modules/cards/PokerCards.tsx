import { type PokerCard as IPokerCard } from "../../core/cards/poker-cards";
import { PokerCardSlot } from "./PokerCardSlot";
import { PokerCardVisual } from "./PokerCardVisual";
import { useEffect, useRef, useState } from "react";

interface PlayCardsProps {
  pokerCards: IPokerCard[];
  onSelectCard?: (card: IPokerCard) => void;
  selectedCards?: string[];
  bottomComponent?: React.ReactNode;
  scaleFactor?: number;
}

interface CardPosition {
  x: number;
  y: number;
}

export const PlayCards = ({
  pokerCards,
  onSelectCard,
  selectedCards,
  bottomComponent,
  scaleFactor,
}: PlayCardsProps) => {
  const slotRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [slotPositions, setSlotPositions] = useState<Map<string, CardPosition>>(
    new Map(),
  );

  useEffect(() => {
    const updatePositions = () => {
      const newPositions = new Map<string, CardPosition>();

      slotRefs.current.forEach((element, cardId) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          newPositions.set(cardId, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      });

      setSlotPositions(newPositions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    return () => window.removeEventListener("resize", updatePositions);
  }, [pokerCards]);

  return (
    <>
      <div className="relative flex justify-between shrink h-full w-full">
        {pokerCards.map((card) => (
          <PokerCardSlot
            key={card.id}
            slotId={card.id}
            ref={(el) => {
              if (el) {
                slotRefs.current.set(card.id, el);
              } else {
                slotRefs.current.delete(card.id);
              }
            }}
          />
        ))}
      </div>
      <div className="fixed inset-0 pointer-events-none">
        {pokerCards.map((card) => {
          const position = slotPositions.get(card.id);
          return (
            <div
              key={card.id}
              className="absolute pointer-events-auto"
              style={{
                transform: position
                  ? `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
                  : "translate(-9999px, -9999px)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <PokerCardVisual
                card={card}
                onSelectCard={() => onSelectCard?.(card)}
                selected={selectedCards?.includes(card.id)}
                bottomComponent={bottomComponent}
                scaleFactor={scaleFactor}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
