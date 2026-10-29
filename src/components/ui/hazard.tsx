/**
 * The hazard stripe. The avoid list allows it exactly twice per page: the top
 * of the emergency band and the top of the final call band.
 */
export function HazardStripe() {
  return (
    <div
      aria-hidden="true"
      className="h-1.5 w-full"
      style={{ backgroundImage: 'var(--hazard)', backgroundColor: 'var(--accent)' }}
    />
  );
}
