import { Sun, Sunset, Moon, UtensilsCrossed, Luggage, Sparkles } from 'lucide-react';
import type { Itinerary } from '@/lib/types';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
}

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  return (
    <div className="mt-8 space-y-5">
      <div className="rounded-2xl border border-mist-300 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-2 text-ember-600">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium uppercase tracking-[0.14em]">
            {itinerary.days}-day plan · {itinerary.budget}
          </span>
        </div>
        <h2 className="mt-2 font-display text-2xl italic text-ink-800 sm:text-3xl">
          {itinerary.destination}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-400">{itinerary.summary}</p>

        {itinerary.packingTips?.length > 0 && (
          <div className="mt-5 flex flex-wrap items-start gap-2 border-t border-mist-300 pt-4">
            <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-200">
              <Luggage className="h-3.5 w-3.5" />
              Pack for it
            </span>
            {itinerary.packingTips.map((tip, i) => (
              <span
                key={i}
                className="rounded-full bg-mist-200 px-3 py-1 text-xs font-medium text-ink-400"
              >
                {tip}
              </span>
            ))}
          </div>
        )}
      </div>

      <ol className="space-y-5">
        {itinerary.plan.map((day) => (
          <li
            key={day.day}
            className="relative overflow-hidden rounded-2xl border border-mist-300 bg-white p-6 shadow-card sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="stamp-edge flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-800 font-display text-lg text-white">
                {day.day}
              </span>
              <h3 className="font-display text-xl text-ink-800">{day.title}</h3>
            </div>

            <div className="mt-5 grid gap-5 border-t border-dashed border-mist-300 pt-5 sm:grid-cols-3">
              <TimeBlock icon={<Sun className="h-4 w-4" />} label="Morning" text={day.morning} />
              <TimeBlock icon={<Sunset className="h-4 w-4" />} label="Afternoon" text={day.afternoon} />
              <TimeBlock icon={<Moon className="h-4 w-4" />} label="Evening" text={day.evening} />
            </div>

            {day.foodRecommendations?.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-mist-300 pt-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-200">
                  <UtensilsCrossed className="h-3.5 w-3.5" />
                  Eat here
                </span>
                {day.foodRecommendations.map((food, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-brass-100 px-3 py-1 text-xs font-medium text-ink-600"
                  >
                    {food}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function TimeBlock({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ember-600">
        {icon}
        {label}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{text}</p>
    </div>
  );
}
