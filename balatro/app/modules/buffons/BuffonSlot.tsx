import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BuffonSlotProps {
  slotId: string;
  className?: string;
}

export const BuffonSlot = forwardRef<HTMLDivElement, BuffonSlotProps>(
  ({ slotId, className }, ref) => {
    return (
      <div
        ref={ref}
        data-slot-id={slotId}
        className={cn("flex items-center justify-center", className)}
      >
        {/* Position physique du slot - vide pour le layout flex */}
      </div>
    );
  },
);

BuffonSlot.displayName = "BuffonSlot";
