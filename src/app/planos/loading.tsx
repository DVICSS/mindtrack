export default function Loading() {
  return (
    <div style={{ padding: 24 }}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando planos…</p>
        </div>
      </div>
    </div>
  );
}
