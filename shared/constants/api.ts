// In development we can still mock via json-server, but for deployment (Netlify)
// we expose the mock data through Next.js at `/api/hotels`.
export const MOCK_API_BASE_URL =
  process.env.NEXT_PUBLIC_MOCK_API_BASE_URL ?? "/api/hotels";
