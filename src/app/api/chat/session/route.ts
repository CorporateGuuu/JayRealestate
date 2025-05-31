import { NextRequest, NextResponse } from 'next/server';

// Session store (in production, use Redis or database)
const chatSessions = new Map<string, {
  messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>;
  createdAt: Date;
  lastActivity: Date;
}>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = chatSessions.get(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sessionId,
      messages: session.messages,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity,
    });

  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const deleted = chatSessions.delete(sessionId);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Session deleted successfully',
      sessionId,
    });

  } catch (error) {
    console.error('Session delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get session statistics
export async function POST(request: NextRequest) {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    let activeSessions = 0;
    let sessionsLastHour = 0;
    let sessionsLastDay = 0;
    let totalMessages = 0;

    for (const [, session] of chatSessions.entries()) {
      if (session.lastActivity > oneHourAgo) {
        activeSessions++;
      }
      if (session.createdAt > oneHourAgo) {
        sessionsLastHour++;
      }
      if (session.createdAt > oneDayAgo) {
        sessionsLastDay++;
      }
      totalMessages += session.messages.length;
    }

    return NextResponse.json({
      totalSessions: chatSessions.size,
      activeSessions,
      sessionsLastHour,
      sessionsLastDay,
      totalMessages,
      timestamp: now.toISOString(),
    });

  } catch (error) {
    console.error('Session stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
