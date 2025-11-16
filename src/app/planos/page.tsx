import { Suspense } from 'react';
import PlanosClient from './planos-client';

export const dynamic = 'force-dynamic'; // evita erro de prerender nessa rota

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Carregando planos…</div>}>
      <PlanosClient />
    </Suspense>
  );
}
