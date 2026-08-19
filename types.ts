export type BudgetLevel = 'Budget' | 'Mid-range' | 'Luxury';

export const INTEREST_OPTIONS = [
  'Adventure',
  'Foodie',
  'History',
  'Relaxation',
  'Nightlife',
  'Nature',
  'Shopping',
  'Art & Culture',
] as const;

export type Interest = (typeof INTEREST_OPTIONS)[number];

export interface TripFormValues {
  destination: string;
  days: number;
  budget: BudgetLevel;
  interests: Interest[];
}

export interface DayPlan {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  foodRecommendations: string[];
}

export interface Itinerary {
  destination: string;
  days: number;
  budget: BudgetLevel;
  summary: string;
  packingTips: string[];
  plan: DayPlan[];
}

export interface GenerateItineraryResponse {
  itinerary: Itinerary;
}

export interface ApiErrorResponse {
  error: string;
}
