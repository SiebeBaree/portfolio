/*
 * SHARED. The small uppercase label that opens every section. Changing it
 * changes all of them.
 */
export default function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
      {children}
    </p>
  );
}
