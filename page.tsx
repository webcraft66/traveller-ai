'use client';

import { useState } from 'react';
import { Compass, AlertTriangle } from 'lucide-react';
import TravelForm from '@/components/TravelForm';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import type { ApiErrorResponse, GenerateItineraryResponse, Itinerary, TripFormValues } from '@/lib/types';

export default function HomePage() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(values: TripFormValues) {
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = (await res.json()) as GenerateItineraryResponse | ApiErrorResponse;

      if (!res.ok) {
        const message = 'error' in data ? data.error : 'Something went wrong. Please try again.';
        setError(message);
        return;
      }

      if ('itinerary' in data) {
        setItinerary(data.itinerary);
      } else {
        setError('The server returned an unexpected response. Please try again.');
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-mist-200 bg-dotted-path bg-dotted-sm bg-fixed">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:pt-20">
        <header className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-mist-300 bg-white px-4 py-1.5 shadow-soft">
            <Compass className="h-4 w-4 text-ember-600" strokeWidth={1.75} />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
              Wayfare
            </span>
          </div>
          <h1 className="font-display text-4xl italic text-ink-800 sm:text-5xl">
            Where to, next?
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-400">
            Give us a destination and a vibe. We&apos;ll draft a full day-by-day itinerary in
            seconds.
          </p>
        </header>

        <TravelForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-ember-500/30 bg-ember-50 p-4 text-sm text-ember-600"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">We couldn&apos;t plan that trip</p>
              <p className="mt-0.5 text-ember-600/90">{error}</p>
            </div>
          </div>
        )}

        {isLoading && <LoadingSkeleton />}
        {!isLoading && itinerary && <ItineraryDisplay itinerary={itinerary} />}
      </div>
    </main>
  );
}
