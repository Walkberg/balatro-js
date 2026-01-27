import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PokerCardSlotProps {
  slotId: string;
  className?: string;
}

export const PokerCardSlot = forwardRef<HTMLDivElement, PokerCardSlotProps>(
  ({ slotId, className }, ref) => {
    return (
      <div
        ref={ref}
        data-slot-id={slotId}
        className={cn(
          "flex items-end justify-center",
          "w-[142px] h-[190px]",
          className
        )}
      >
        {/* Position physique du slot - vide pour le layout flex */}
      </div>
    );
  }
);

PokerCardSlot.displayName = "PokerCardSlot";
