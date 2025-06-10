'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  MessageSquare,
  Clock
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';
import { ProtectedRoute } from '@/components/admin/AdminAuth';

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
  };
  sources: Array<{
    source: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState('30');

  const fetchAnalytics = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    
    try {
      const response = await fetch(`/api/admin/analytics?period=${period}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnalyticsData(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const handleRefresh = () => {
    fetchAnalytics(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
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
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="mt-2 text-gray-600">
                Welcome back! Here's what's happening with your leads.
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              
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
                Export
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          {analyticsData ? (
            <DashboardStats data={analyticsData.overview} loading={loading} />
          ) : (
            <DashboardStats 
              data={{
                totalLeads: 0,
                newLeads: 0,
                contactedLeads: 0,
                qualifiedLeads: 0,
                closedLeads: 0,
                conversionRate: 0,
                avgResponseTime: 0
              }} 
              loading={loading} 
            />
          )}

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lead Sources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Lead Sources</h3>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-24 h-4 bg-gray-200 rounded"></div>
                        <div className="w-12 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : analyticsData?.sources ? (
                <div className="space-y-4">
                  {analyticsData.sources.slice(0, 5).map((source, index) => (
                    <div key={source.source}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {source.source.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-gray-500">
                          {source.count} ({source.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${source.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="bg-blue-600 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No lead source data available</p>
                </div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="animate-pulse flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : analyticsData?.recentActivity ? (
                <div className="space-y-4">
                  {analyticsData.recentActivity.slice(0, 5).map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent activity</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Users className="w-4 h-4 mr-2" />
                View All Leads
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Follow-up
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </button>
            </div>
          </motion.div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
