import type { TripFormValues } from './types';

/**
 * JSON schema passed to Gemini so the model is constrained to return
 * exactly the shape our UI expects (see lib/types.ts -> Itinerary).
 */
export const itineraryResponseSchema = {
  type: 'object',
  properties: {
    destination: { type: 'string' },
    days: { type: 'integer' },
    budget: { type: 'string' },
    summary: {
      type: 'string',
      description: 'A short 2-3 sentence overview of the trip.',
    },
    packingTips: {
      type: 'array',
      items: { type: 'string' },
      description: '3-5 short packing or preparation tips for this trip.',
    },
    plan: {
      type: 'array',
      description: 'One entry per day of the trip, in order.',
      items: {
        type: 'object',
        properties: {
          day: { type: 'integer' },
          title: {
            type: 'string',
            description: 'A short, evocative title for the day, e.g. "Old Town & Harbor Sunset".',
          },
          morning: { type: 'string' },
          afternoon: { type: 'string' },
          evening: { type: 'string' },
          foodRecommendations: {
            type: 'array',
            items: { type: 'string' },
            description: '2-4 specific local dishes or restaurants to try that day.',
          },
        },
        required: ['day', 'title', 'morning', 'afternoon', 'evening', 'foodRecommendations'],
      },
    },
  },
  required: ['destination', 'days', 'budget', 'summary', 'packingTips', 'plan'],
};

export function buildItineraryPrompt(values: TripFormValues): string {
  const { destination, days, budget, interests } = values;
  const interestList = interests.length > 0 ? interests.join(', ') : 'a balanced mix of popular activities';

  return `You are an expert local travel planner. Create a detailed, realistic, and specific day-by-day itinerary.

Trip details:
- Destination: ${destination}
- Length of trip: ${days} day${days === 1 ? '' : 's'}
- Budget level: ${budget}
- Traveler interests / vibe: ${interestList}

Instructions:
- Produce exactly ${days} day entries in the "plan" array, numbered 1 through ${days}.
- Tailor activities to the stated budget level (e.g. "Budget" should favor free/low-cost activities, street food, and public transport; "Luxury" should favor premium experiences, fine dining, and private transport).
- Weight activity choices toward the traveler's stated interests.
- Recommend real, specific places, neighborhoods, or landmarks in ${destination} whenever possible rather than generic descriptions.
- Each day must include distinct morning, afternoon, and evening plans (1-2 sentences each) and 2-4 concrete local food recommendations.
- Keep the tone warm, practical, and specific — like a knowledgeable local friend, not a generic brochure.
- Return ONLY the structured data described by the response schema. Do not include markdown, commentary, or text outside the schema fields.`;
}
