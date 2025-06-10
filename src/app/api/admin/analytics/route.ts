import { NextRequest, NextResponse } from 'next/server';
import { AdminAuth } from '@/lib/admin-auth';
import { supabase } from '@/lib/database';

// Middleware to verify admin authentication
async function verifyAdminAuth(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  
  if (!token) {
    return null;
  }

  const payload = AdminAuth.verifyToken(token);
  if (!payload) {
    return null;
  }

  const user = await AdminAuth.getAdminById(payload.userId);
  return user;
}

// Analytics data interface
interface AnalyticsData {
  overview: {
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    qualifiedLeads: number;
    closedLeads: number;
    conversionRate: number;
    avgResponseTime: number;
  };
  trends: {
    dailyLeads: Array<{ date: string; count: number }>;
    weeklyLeads: Array<{ week: string; count: number }>;
    monthlyLeads: Array<{ month: string; count: number }>;
  };
  sources: Array<{
    source: string;
    count: number;
    percentage: number;
    conversionRate: number;
  }>;
  propertyTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'new_lead' | 'status_change' | 'response';
    description: string;
    timestamp: string;
  }>;
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized access',
          code: 'UNAUTHORIZED'
        },
        { status: 401 }
      );
    }

    // Check if database is available
    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database not available - missing environment variables',
          code: 'DATABASE_UNAVAILABLE'
        },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Get overview statistics
    const { data: overviewData, error: overviewError } = await supabase
      .from('leads')
      .select('status, created_at, source, property_type')
      .gte('created_at', startDate.toISOString());

    if (overviewError) {
      throw new Error('Failed to fetch overview data');
    }

    const totalLeads = overviewData.length;
    const newLeads = overviewData.filter(lead => lead.status === 'new').length;
    const contactedLeads = overviewData.filter(lead => lead.status === 'contacted').length;
    const qualifiedLeads = overviewData.filter(lead => lead.status === 'qualified').length;
    const closedLeads = overviewData.filter(lead => lead.status === 'closed').length;
    const conversionRate = totalLeads > 0 ? Math.round((qualifiedLeads + closedLeads) / totalLeads * 100) : 0;

    // Calculate daily trends
    const dailyLeads = [];
    for (let i = parseInt(period) - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = overviewData.filter(lead => 
        lead.created_at.startsWith(dateStr)
      ).length;
      
      dailyLeads.push({
        date: dateStr,
        count
      });
    }

    // Calculate source distribution
    const sourceMap = new Map<string, number>();
    const sourceConversions = new Map<string, number>();
    
    overviewData.forEach(lead => {
      const source = lead.source || 'unknown';
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
      
      if (lead.status === 'qualified' || lead.status === 'closed') {
        sourceConversions.set(source, (sourceConversions.get(source) || 0) + 1);
      }
    });

    const sources = Array.from(sourceMap.entries()).map(([source, count]) => ({
      source,
      count,
      percentage: Math.round((count / totalLeads) * 100),
      conversionRate: Math.round(((sourceConversions.get(source) || 0) / count) * 100)
    })).sort((a, b) => b.count - a.count);

    // Calculate property type distribution
    const propertyTypeMap = new Map<string, number>();
    
    overviewData.forEach(lead => {
      if (lead.property_type) {
        const type = lead.property_type;
        propertyTypeMap.set(type, (propertyTypeMap.get(type) || 0) + 1);
      }
    });

    const propertyTypes = Array.from(propertyTypeMap.entries()).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / totalLeads) * 100)
    })).sort((a, b) => b.count - a.count);

    // Get recent activity (last 10 leads)
    const { data: recentLeads, error: recentError } = await supabase
      .from('leads')
      .select('id, name, status, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (recentError) {
      throw new Error('Failed to fetch recent activity');
    }

    const recentActivity = recentLeads.map(lead => ({
      id: lead.id,
      type: 'new_lead' as const,
      description: `New lead from ${lead.name}`,
      timestamp: lead.created_at
    }));

    // Calculate weekly and monthly trends
    const weeklyLeads = [];
    const monthlyLeads = [];

    // For simplicity, using daily data to calculate weekly/monthly
    // In production, you might want more sophisticated grouping
    for (let i = 0; i < Math.min(4, Math.floor(parseInt(period) / 7)); i++) {
      const weekStart = i * 7;
      const weekEnd = (i + 1) * 7;
      const weekData = dailyLeads.slice(-weekEnd, -weekStart || undefined);
      const weekCount = weekData.reduce((sum, day) => sum + day.count, 0);
      
      weeklyLeads.unshift({
        week: `Week ${i + 1}`,
        count: weekCount
      });
    }

    const analytics: AnalyticsData = {
      overview: {
        totalLeads,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        closedLeads,
        conversionRate,
        avgResponseTime: 0 // TODO: Calculate based on response timestamps
      },
      trends: {
        dailyLeads,
        weeklyLeads,
        monthlyLeads: [] // TODO: Implement monthly trends
      },
      sources,
      propertyTypes,
      recentActivity
    };

    return NextResponse.json(
      {
        success: true,
        data: analytics,
        period: parseInt(period)
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching analytics:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch analytics data',
        code: 'ANALYTICS_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
