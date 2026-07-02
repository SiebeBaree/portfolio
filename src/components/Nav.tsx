export function Nav() {
  return (
    // Scrolls away with the hero so it can never overlap the story below.
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-baseline justify-between px-6 py-6 md:px-12">
        <p className="font-sans text-[0.875rem] text-ink">Siebe Barée</p>
        <a
          href="#contact"
          className="font-serif text-[0.9375rem] text-muted italic transition-colors duration-200 hover:text-accent"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
