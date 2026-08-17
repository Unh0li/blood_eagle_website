const RUNES = [
  "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ",
  "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ",
  "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ",
];

// Doubled, not quadrupled: the track animates by -50%, so two copies is all a
// seamless loop needs. Four copies meant 192 glyphs on screen, and glowing each
// one individually cost more than the rest of the page combined.
const SEQ = [...RUNES, ...RUNES];

export default function RuneColumns() {
  return (
    <>
      {/* left — runes travel down */}
      <div className="rune-col rune-col--left">
        <div className="rune-col__track rune-col__track--down">
          {SEQ.map((r, i) => (
            <span key={i} className="rune-glyph">{r}</span>
          ))}
        </div>
        {/* One travelling highlight per column reads as glyphs lighting up in
            sequence, at the cost of a single translating element — the old
            version animated text-shadow on every glyph to get the same idea. */}
        <span className="rune-col__sweep" aria-hidden="true" />
      </div>

      {/* right — runes travel up */}
      <div className="rune-col rune-col--right">
        <div className="rune-col__track rune-col__track--up">
          {SEQ.map((r, i) => (
            <span key={i} className="rune-glyph">{r}</span>
          ))}
        </div>
        <span className="rune-col__sweep rune-col__sweep--up" aria-hidden="true" />
      </div>
    </>
  );
}
