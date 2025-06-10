'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Filter,
  Search,
  Download
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  property_type?: string;
  budget?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at: string;
  updated_at: string;
}

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  onStatusUpdate: (leadId: string, status: Lead['status']) => void;
  onDelete: (leadId: string) => void;
  onView: (lead: Lead) => void;
}

const LeadsTable = ({ leads, loading, onStatusUpdate, onDelete, onView }: LeadsTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'contact-page':
        return <Mail className="w-4 h-4" />;
      case 'property-inquiry':
        return <Building className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="flex space-x-4">
              <div className="h-10 bg-gray-200 rounded w-64"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-20 h-6 bg-gray-200 rounded"></div>
                  <div className="w-24 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header with filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Leads Management</h2>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leads by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>

          {/* Source filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sources</option>
            <option value="contact-page">Contact Page</option>
            <option value="property-inquiry">Property Inquiry</option>
            <option value="newsletter">Newsletter</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredLeads.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  {/* Contact Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Details */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {lead.subject && (
                        <div className="font-medium capitalize mb-1">{lead.subject}</div>
                      )}
                      {lead.property_type && (
                        <div className="text-gray-500 flex items-center mb-1">
                          <Building className="w-3 h-3 mr-1" />
                          {lead.property_type}
                        </div>
                      )}
                      {lead.budget && (
                        <div className="text-gray-500">Budget: AED {lead.budget}</div>
                      )}
                    </div>
                  </td>

                  {/* Source */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      {getSourceIcon(lead.source)}
                      <span className="ml-2 capitalize">{lead.source.replace('-', ' ')}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={lead.status}
                      onChange={(e) => onStatusUpdate(lead.id, e.target.value as Lead['status'])}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(lead.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(lead.created_at)}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onView(lead)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' || sourceFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No leads have been captured yet'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination would go here */}
      {filteredLeads.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredLeads.length} of {leads.length} leads
            </div>
            {/* Add pagination controls here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsTable;
