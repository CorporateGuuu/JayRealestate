'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  UserCheck,
  Target,
  RefreshCw,
  Download,
  Mail,
  Phone,
  Calendar,
  X
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import LeadsTable from '@/components/admin/LeadsTable';
import { ProtectedRoute } from '@/components/admin/AdminAuth';

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

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchLeads = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    
    try {
      const response = await fetch('/api/admin/leads', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLeads(data.data.leads);
        }
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusUpdate = async (leadId: string, status: Lead['status']) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ leadId, status }),
      });

      if (response.ok) {
        // Update local state
        setLeads(prevLeads =>
          prevLeads.map(lead =>
            lead.id === leadId ? { ...lead, status } : lead
          )
        );
      }
    } catch (error) {
      console.error('Failed to update lead status:', error);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads?id=${leadId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
      }
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const handleView = (lead: Lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleRefresh = () => {
    fetchLeads(true);
  };

  // Calculate stats
  const stats = {
    total: leads.length,
    new: leads.filter(lead => lead.status === 'new').length,
    contacted: leads.filter(lead => lead.status === 'contacted').length,
    qualified: leads.filter(lead => lead.status === 'qualified').length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
              <p className="mt-2 text-gray-600">
                Manage and track all your real estate leads
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Export Leads
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">New Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Contacted</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.contacted}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Qualified</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.qualified}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Leads Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <LeadsTable
              leads={leads}
              loading={loading}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
              onView={handleView}
            />
          </motion.div>
        </div>

        {/* Lead Detail Modal */}
        {showModal && selectedLead && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Lead Details</h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedLead.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1 flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:text-blue-800">
                            {selectedLead.email}
                          </a>
                        </div>
                      </div>

                      {selectedLead.phone && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <div className="mt-1 flex items-center text-sm text-gray-900">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:text-blue-800">
                              {selectedLead.phone}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedLead.subject && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <p className="mt-1 text-sm text-gray-900 capitalize">{selectedLead.subject}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {selectedLead.property_type && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Property Type</label>
                          <p className="mt-1 text-sm text-gray-900 capitalize">{selectedLead.property_type}</p>
                        </div>
                      )}

                      {selectedLead.budget && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Budget</label>
                          <p className="mt-1 text-sm text-gray-900">AED {selectedLead.budget}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Message</label>
                      <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLead.message}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Source</label>
                        <p className="mt-1 text-sm text-gray-900 capitalize">{selectedLead.source.replace('-', ' ')}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <span className={`mt-1 inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                          selectedLead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          selectedLead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                          selectedLead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedLead.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created</label>
                      <div className="mt-1 flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(selectedLead.created_at)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
