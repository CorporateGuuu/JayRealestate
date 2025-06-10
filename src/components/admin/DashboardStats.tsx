'use client';

import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  Clock,
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface StatsData {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  closedLeads: number;
  conversionRate: number;
  avgResponseTime: number;
}

interface DashboardStatsProps {
  data: StatsData;
  loading?: boolean;
}

const DashboardStats = ({ data, loading = false }: DashboardStatsProps) => {
  const stats = [
    {
      name: 'Total Leads',
      value: data.totalLeads,
      icon: Users,
      color: 'blue',
      change: '+12%',
      changeType: 'increase' as const,
      description: 'All time leads'
    },
    {
      name: 'New Leads',
      value: data.newLeads,
      icon: UserPlus,
      color: 'green',
      change: '+8%',
      changeType: 'increase' as const,
      description: 'Awaiting contact'
    },
    {
      name: 'Contacted',
      value: data.contactedLeads,
      icon: UserCheck,
      color: 'yellow',
      change: '+5%',
      changeType: 'increase' as const,
      description: 'In progress'
    },
    {
      name: 'Qualified',
      value: data.qualifiedLeads,
      icon: Target,
      color: 'purple',
      change: '+15%',
      changeType: 'increase' as const,
      description: 'High potential'
    },
    {
      name: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      icon: TrendingUp,
      color: 'indigo',
      change: '+3%',
      changeType: 'increase' as const,
      description: 'Lead to qualified'
    },
    {
      name: 'Avg Response Time',
      value: data.avgResponseTime > 0 ? `${data.avgResponseTime}h` : 'N/A',
      icon: Clock,
      color: 'red',
      change: '-2h',
      changeType: 'decrease' as const,
      description: 'First response'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      red: 'bg-red-50 text-red-600 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded mb-2"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${colorClasses}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className={`flex items-center text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            </div>
            
            <p className="text-xs text-gray-500">{stat.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
