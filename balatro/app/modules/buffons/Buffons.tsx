import { useEffect, useRef, useState } from "react";
import { SellCard } from "../consumables/SellCard";
import { BuffonVisual } from "./BuffonVisual";
import { BuffonSlot } from "./BuffonSlot";
import { useBuffonManager } from "./useBuffonManager";
import { type BuffonCard as Buffon } from "../../core/cards/buffons";
import { CardContainer } from "../../components/BalatroPage";

interface BuffonsProps {}

interface CardPosition {
  x: number;
  y: number;
}

export const Buffons = ({}: BuffonsProps) => {
  const [selectedItem, setSelectedItem] = useState<Buffon | null>(null);
  const slotRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [slotPositions, setSlotPositions] = useState<Map<string, CardPosition>>(
    new Map(),
  );

  const buffonManager = useBuffonManager();

  useEffect(() => {
    if (!buffonManager) return;

    const updatePositions = () => {
      const newPositions = new Map<string, CardPosition>();

      slotRefs.current.forEach((element, buffonId) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          newPositions.set(buffonId, {
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
  }, [buffonManager?.buffons]);

  if (buffonManager == null) {
    return null;
  }

  const handleSellJoker = (id: string) => {
    buffonManager.buffonManager.sellBuffon(id);
  };

  return (
    <CardContainer
      maxCount={buffonManager.buffonManager.getMaxCount()}
      currentCount={buffonManager.buffons.length}
    >
      <>
        {/* Slots physiques pour le layout flex */}
        <div className="flex flex-row gap-2 justify-between">
          {buffonManager.buffons.map((buffon) => (
            <BuffonSlot
              key={buffon.id}
              slotId={buffon.id}
              ref={(el) => {
                if (el) {
                  slotRefs.current.set(buffon.id, el);
                } else {
                  slotRefs.current.delete(buffon.id);
                }
              }}
            />
          ))}
        </div>

        {/* Visuels des buffons en position absolute */}
        <div className="fixed inset-0 pointer-events-none">
          {buffonManager.buffons.map((buffon) => {
            const position = slotPositions.get(buffon.id);
            return (
              <div
                key={buffon.id}
                className="absolute pointer-events-auto"
                style={{
                  transform: position
                    ? `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
                    : "translate(-9999px, -9999px)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <BuffonVisual
                  selected={selectedItem?.id === buffon.id}
                  buffon={buffon}
                  hoverSide={"bottom"}
                  onClick={() =>
                    setSelectedItem(
                      selectedItem?.id === buffon.id ? null : buffon,
                    )
                  }
                  rightComponent={
                    <SellCard
                      sellable={buffon}
                      onSell={() => handleSellJoker(buffon.id)}
                    />
                  }
                />
              </div>
            );
          })}
        </div>
      </>
    </CardContainer>
  );
};
