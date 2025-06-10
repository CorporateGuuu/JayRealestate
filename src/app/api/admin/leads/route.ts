import { NextRequest, NextResponse } from 'next/server';
import { AdminAuth } from '@/lib/admin-auth';
import { LeadManager, Lead } from '@/lib/database';

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

// GET - Fetch leads with pagination and filtering
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Get leads with filters
    let leads: Lead[] = [];
    let total = 0;

    if (status && status !== 'all') {
      leads = await LeadManager.getLeadsByStatus(status as Lead['status']);
      total = leads.length;
    } else if (search) {
      leads = await LeadManager.searchLeads(search);
      total = leads.length;
    } else {
      const result = await LeadManager.getLeads(page, limit);
      leads = result.leads;
      total = result.total;
    }

    // Apply additional filters
    if (source && source !== 'all') {
      leads = leads.filter(lead => lead.source === source);
    }

    // Apply sorting
    leads.sort((a, b) => {
      const aValue = a[sortBy as keyof Lead] || '';
      const bValue = b[sortBy as keyof Lead] || '';
      
      if (sortOrder === 'desc') {
        return String(bValue).localeCompare(String(aValue));
      } else {
        return String(aValue).localeCompare(String(bValue));
      }
    });

    // Calculate pagination
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        data: {
          leads,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage,
            hasPrevPage
          }
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching leads:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leads',
        code: 'FETCH_ERROR'
      },
      { status: 500 }
    );
  }
}

// PUT - Update lead status
export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    const { leadId, status, notes } = body;

    if (!leadId || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead ID and status are required',
          code: 'MISSING_FIELDS'
        },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['new', 'contacted', 'qualified', 'closed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status value',
          code: 'INVALID_STATUS'
        },
        { status: 400 }
      );
    }

    // Update lead status
    const updatedLead = await LeadManager.updateLeadStatus(leadId, status);

    // TODO: Add lead notes functionality when notes table is created
    if (notes && notes.trim()) {
      console.log(`Admin ${admin.name} added note to lead ${leadId}: ${notes}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead status updated successfully',
        data: updatedLead
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating lead:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update lead',
        code: 'UPDATE_ERROR'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete lead
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('id');

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead ID is required',
          code: 'MISSING_ID'
        },
        { status: 400 }
      );
    }

    // Delete lead
    const success = await LeadManager.deleteLead(leadId);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete lead',
          code: 'DELETE_ERROR'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead deleted successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting lead:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete lead',
        code: 'DELETE_ERROR'
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
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
