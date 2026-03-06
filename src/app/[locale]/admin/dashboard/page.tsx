import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading template...</div>}>
      <div>Admim</div>
    </Suspense>
  );
}
