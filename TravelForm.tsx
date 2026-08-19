'use client';

import { useState } from 'react';
import { Compass, MapPin, CalendarDays, Wallet, Loader2 } from 'lucide-react';
import { INTEREST_OPTIONS, type BudgetLevel, type Interest, type TripFormValues } from '@/lib/types';

interface TravelFormProps {
  onSubmit: (values: TripFormValues) => void;
  isLoading: boolean;
}

const BUDGET_OPTIONS: BudgetLevel[] = ['Budget', 'Mid-range', 'Luxury'];

export default function TravelForm({ onSubmit, isLoading }: TravelFormProps) {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState<number>(4);
  const [budget, setBudget] = useState<BudgetLevel>('Mid-range');
  const [interests, setInterests] = useState<Interest[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  function toggleInterest(interest: Interest) {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (destination.trim().length === 0) {
      setFormError('Tell us where you are headed.');
      return;
    }
    if (!Number.isInteger(days) || days < 1 || days > 21) {
      setFormError('Trip length must be between 1 and 21 days.');
      return;
    }

    setFormError(null);
    onSubmit({ destination: destination.trim(), days, budget, interests });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-mist-300 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="mb-6 flex items-center gap-2 text-ink-400">
        <Compass className="h-5 w-5" strokeWidth={1.75} />
        <span className="text-sm font-medium uppercase tracking-[0.14em]">Trip details</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="destination" className="mb-1.5 block text-sm font-medium text-ink-600">
            Destination
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-200" />
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Lisbon, Portugal"
              maxLength={100}
              className="focus-ring w-full rounded-xl border border-mist-300 bg-mist-100 py-3 pl-10 pr-4 text-ink placeholder:text-ink-200 transition-colors focus:border-ember-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="days" className="mb-1.5 block text-sm font-medium text-ink-600">
            Number of days
          </label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-200" />
            <input
              id="days"
              type="number"
              min={1}
              max={21}
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value, 10) || 0)}
              className="focus-ring w-full rounded-xl border border-mist-300 bg-mist-100 py-3 pl-10 pr-4 text-ink transition-colors focus:border-ember-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-ink-600">
            Budget level
          </label>
          <div className="relative">
            <Wallet className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-200" />
            <select
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value as BudgetLevel)}
              className="focus-ring w-full appearance-none rounded-xl border border-mist-300 bg-mist-100 py-3 pl-10 pr-4 text-ink transition-colors focus:border-ember-500"
            >
              {BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <span className="mb-2 block text-sm font-medium text-ink-600">
          Interests &amp; vibe <span className="font-normal text-ink-200">(optional)</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const active = interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                aria-pressed={active}
                onClick={() => toggleInterest(interest)}
                className={`focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'border-ember-500 bg-ember-500 text-white shadow-soft'
                    : 'border-mist-300 bg-mist-100 text-ink-400 hover:border-ember-400 hover:text-ink-600'
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {formError && (
        <p role="alert" className="mt-4 text-sm font-medium text-ember-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="focus-ring mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-ink-800 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-ink-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Charting your route
          </>
        ) : (
          'Plan my trip'
        )}
      </button>
    </form>
  );
}
