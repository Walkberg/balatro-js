import { getPlanetConfig } from "../../core/cards/planets";
import { type Consumable } from "../../core/plugins";
import {
  getBackgroundPosition,
  getCardSizeStyle,
  getCardConsumableBackgroundStyle,
} from "./card";
import { SIZE_FACTOR } from "./card";

interface PlanetCardProps {
  planet: Consumable;
  onClick?: () => void;
}

export const PlanetCard = ({ planet, onClick }: PlanetCardProps) => {
  const configId = planet.configId;

  const config = getPlanetConfig(configId);

  if (config == null) {
    return null;
  }

  const pos = getBackgroundPosition(config.position, SIZE_FACTOR);

  return (
    <button
      onClick={onClick}
      className="card-consumables"
      style={{
        ...getCardSizeStyle(SIZE_FACTOR),
        ...getCardConsumableBackgroundStyle(SIZE_FACTOR),
        backgroundPositionX: pos.x,
        backgroundPositionY: pos.y,
      }}
    />
  );
};
