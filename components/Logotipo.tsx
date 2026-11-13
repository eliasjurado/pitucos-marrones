/** Logotipo PITU / MERCH recreado como texto (el original es de 150 px y no se agranda). */
export function Logotipo({ className = "" }: { className?: string }) {
  return (
    <span role="img" aria-label="Pitumerch" className={`logotipo ${className}`}>
      <span aria-hidden="true" className="logotipo-pitu">PITU</span>
      <span aria-hidden="true" className="logotipo-merch">MERCH</span>
    </span>
  );
}
