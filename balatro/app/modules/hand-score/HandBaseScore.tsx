import { useEffect, useState } from "react";
import { useCurrentGame } from "../../components/BalatroProvider";
import {
  getHandScorePlugin,
  type HandManagerPlugin,
  type HandScoreManagerPlugin,
  type PokerHandType,
} from "../../core/plugins";
import { type Score as IScore } from "../../core/balatro";
import { type Hand as IHand } from "../../core/balatro";
import { evaluatePokerHand } from "../../core/hand-evaluator";
import { Card } from "@/components/ui/card";
import { ScoreDetail } from "../../components/BalatroPage";

interface HandBaseScoreProps {}

export const HandBaseScore = ({}: HandBaseScoreProps) => {
  const { balatro } = useCurrentGame();

  const [score, setScore] = useState<IScore>({ chip: 0, multiplier: 0 });
  const [hand, setHand] = useState<IHand>([]);
  const [pokerHandType, setPokerHandType] = useState<PokerHandType | null>(
    null,
  );
  const [handScoreManagerPlugin, setHandScoreManagerPlugin] =
    useState<HandScoreManagerPlugin>();

  useEffect(() => {
    if (balatro == null) return;

    const handManager = balatro.getPlugin<HandManagerPlugin>("hand");
    const handScorePlugin = getHandScorePlugin(balatro);

    if (handManager == null) return;

    if (handScorePlugin != null) {
      setHandScoreManagerPlugin(handScorePlugin);
    }

    balatro.onEvent("score-calculated", (score) => setScore(score));

    balatro.onEvent("card-selected", () =>
      setPokerHand(handManager.getSelectedCards()),
    );

    balatro.onEvent("card-unselected", () =>
      setPokerHand(handManager.getSelectedCards()),
    );

    function setPokerHand(selectedCards: IHand): void {
      if (handManager == null) return;

      const handtype =
        selectedCards.length > 0 ? evaluatePokerHand(selectedCards) : null;

      return setPokerHandType(handtype);
    }
  }, [balatro]);

  if (hand == null) return <div>No hand</div>;

  const baseScore = pokerHandType
    ? handScoreManagerPlugin?.getHandScore(pokerHandType)
    : undefined;

  const handBaseScore = baseScore
    ? {
        chip: baseScore.chip,
        multiplier: baseScore.multiplier,
      }
    : { chip: 0, multiplier: 0 };

  const handLevelText = baseScore != null ? `niv.${baseScore.level}` : "";

  return (
    <Card className="flex flex-col items-center align-middle p-2 bg-slate-900 text-white w-full end">
      <div>
        {getPokerHandName(pokerHandType)} {handLevelText}
      </div>
      <ScoreDetail score={handBaseScore} />
    </Card>
  );
};

function getPokerHandName(handType: PokerHandType | null): string {
  switch (handType) {
    case "HighCard":
      return "High Card";
    case "OnePair":
      return "One Pair";
    case "TwoPair":
      return "Two Pair";
    case "ThreeOfAKind":
      return "Three of a Kind";
    case "Straight":
      return "Straight";
    case "Flush":
      return "Flush";
    case "FullHouse":
      return "Full House";
    case "FourOfAKind":
      return "Four of a Kind";
    case "StraightFlush":
      return "Straight Flush";
    case "RoyalFlush":
      return "Royal Flush";
    default:
      return "";
  }
}
