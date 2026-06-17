/** Alternating 7+5 column pairs fill every row; odd count ends on a full-width tile. */
export function mosaicItemClass(index: number, total: number) {
  if (index === total - 1 && total % 2 === 1) return "is-full";
  const pairIndex = Math.floor(index / 2);
  const isFirstInPair = index % 2 === 0;
  const wideFirst = pairIndex % 2 === 0;
  return (isFirstInPair ? wideFirst : !wideFirst) ? "is-wide" : "";
}
