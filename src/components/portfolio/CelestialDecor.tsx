type CelestialDecorProps = { variant?: "intro" | "hero" };

export function CelestialDecor({ variant = "intro" }: CelestialDecorProps) {
  return (
    <div className={`celestial-scene celestial-scene--${variant}`} aria-hidden="true">
      <div className="celestial-moon"><i /><i /><i /></div>
      <span className="celestial-meteor celestial-meteor--one" />
      <span className="celestial-meteor celestial-meteor--two" />
      <span className="celestial-meteor celestial-meteor--three" />
      <span className="celestial-meteor celestial-meteor--four" />
    </div>
  );
}
