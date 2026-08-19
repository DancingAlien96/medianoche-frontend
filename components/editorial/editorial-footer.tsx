export function EditorialFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="pie">
      <div className="pie-in">
        <span>© {year} Medianoche · Guatemala</span>
        <nav className="pie-links">
          <a href="/anatomia/index.html">Anatomía</a>
          <a href="/catalogo">Catálogo</a>
          <a href="/nosotros">Nosotros</a>
        </nav>
      </div>
    </footer>
  );
}
