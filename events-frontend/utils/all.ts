export function logBounds(
  northBound: number,
  westBounds: number,
  eastBound: number,
  southBound: number
) {
  const text =
    "\t\tN:" +
    northBound.toFixed(2) +
    "\nW:" +
    westBounds.toFixed(2) +
    "\t\t\tE:" +
    eastBound.toFixed(2) +
    "\n\t\tS:" +
    southBound.toFixed(2);
  console.log(`%c ${text}`, "color:lightblue");
}
