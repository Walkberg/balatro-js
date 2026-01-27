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
        className={cn("flex justify-center grow", className)}
      ></div>
    );
  },
);

PokerCardSlot.displayName = "PokerCardSlot";
