
export async function getProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
    'http://localhost:8080/api/v1';

  const res = await fetch(`${baseUrl}/products/public`);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const payload = await res.json();
  return payload?.data?.data ?? payload?.data ?? [];
}
