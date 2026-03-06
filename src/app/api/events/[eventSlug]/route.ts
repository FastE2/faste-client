// app/api/events/[eventSlug]/route.ts
import { mockEventData } from '@/app/[locale]/m/[eventSlug]/page';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventSlug: string }> },
) {
  try {
    const { eventSlug } = await params;
    const eventData = mockEventData[eventSlug];

    if (!eventData) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json(eventData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
