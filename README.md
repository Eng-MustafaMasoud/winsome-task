# Hotel Search Platform
the prod url: https://hotelfinder-winsome.netlify.app/


Senior Frontend assessment implementation using Next.js, React, Ant Design, and React Query.

## Run Locally

```bash
npm install
npm run dev
```
App: `http://localhost:3000`  
i use json server for mock api
Mock API: `http://localhost:4000/hotels`

## What Is Implemented

- Search experience with location suggestions, date range, guest selector, and CTA.
- Results page with image, name, price, rating, and location.
- Filters: price range, minimum rating, and max distance.
- Sorting: best match, price low-high, rating, nearest.
- Loading, error, and retry support via React Query.
- Infinite loading for hotel results.

## Architecture (Short)

- `app/`: route-level pages and layout.
- `features/`: feature modules (`hotel-search`, `hotel-results`, `home`) with `components`, `hooks`, `api`, `types`.
- `shared/`: reusable APIs, constants, hooks, and UI.
- `providers/`: global providers (React Query and Ant Design setup).

This structure keeps UI, business logic, and data access separated and easy to scale.

## State Management Choice

I used **React Query + local component state**.

- React Query handles server state (fetching, caching, retries, loading/error states).
- Local UI state handles filters, sort, and form interactions.

Why this choice: it keeps async data predictable without over-engineering a global store.

## Ranking Logic (Best Match)

Current best match score:

- `score = (rating * 2) - (price / 100)`
- Higher rating increases rank.
- Higher price decreases rank.

This gives a simple balance between quality and affordability.

## Performance Notes

- Avoiding unnecessary re-renders with memoization patterns (`useMemo`, `useCallback`, deferred values).
- Pagination + infinite loading avoids rendering all results at once.
- Next.js dynamic routes and feature separation support code splitting.
- Image component is used, but further image optimization can be improved (see trade-offs).

## Caching, Error Handling, Retry

- Caching: React Query cache with `staleTime` in list queries.
- Error handling: API errors are surfaced to user-friendly alerts.
- Retry: queries use retry strategy (configured in query client).

## Scalability (100K+ Daily Users)

- Scale app instances horizontally behind a load balancer.
- Put static assets and cacheable responses behind a CDN.
- Move filtering/sorting/pagination fully to backend for large datasets.
- Add DB indexing + read replicas + connection pooling.
- Add Redis cache for hot searches and popular locations.
- Offload non-critical jobs to background workers.
- Add observability (logs, traces, p95/p99 metrics) and autoscaling rules.

## Trade-offs and What I Would Improve

### Why this state management

React Query + local state is fast to build, simple to reason about, and enough for this product scope.

### Improvements with more time

- Move search/filter/sort logic server-side (currently much of it is client-side after fetch).
- Add list virtualization for very large result sets.
- Enable Next image optimization fully (`unoptimized` is currently used in cards).
- Add SSR/ISR strategy for SEO and faster first contentful paint.
- Add test coverage (unit + integration + e2e).
- Improve accessibility and booking funnel analytics.

## Debug Task: App Slow With 100+ Hotels

### Possible causes

- Rendering too many cards at once.
- Expensive filtering/sorting on every interaction.
- Large image payloads.
- Unnecessary re-renders from frequent state updates.

### Fix plan

- Virtualize list rendering.
- Memoize computed lists and keep stable props.
- Debounce filter changes and move heavy operations server-side.
- Optimize image sizes/formats and lazy loading.

## UX Decision: Users Drop Before Booking

I would reduce friction in the funnel:

- Show total price early (with fees) to avoid surprise.
- Save recent search and form progress.
- Add trust signals near CTA (reviews, cancellation policy, secure payment).
- Make booking CTA sticky on mobile.
- Run A/B tests on checkout steps and payment options.
