const RUNES = [
  "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ",
  "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ",
  "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ",
];

/* dvakrat, ne stirikrat, ker se traku premakne za -50%
   stiri kopije so pomenile 192 znakov in vec stroska kot vsa ostala stran */
const SEQ = [...RUNES, ...RUNES];

export default function RuneColumns() {
  return (
    <>
      {/* levi stolpec, rune potujejo navzdol */}
      <div className="rune-col rune-col--left">
        <div className="rune-col__track rune-col__track--down">
          {SEQ.map((r, i) => (
            <span key={i} className="rune-glyph">{r}</span>
          ))}
        </div>
        {/* en potujoc odsev na stolpec, videti je kot da se rune prizigajo */}
        <span className="rune-col__sweep" aria-hidden="true" />
      </div>

      {/* desni stolpec, rune potujejo navzgor */}
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
