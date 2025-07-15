'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { useStore } from '@/lib/store';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  Activity, 
  Clock, 
  DollarSign, 
  FileText, 
  Pill, 
  TrendingUp, 
  Users,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { prescriptions, transactions, medicines } = useStore();

  const getDashboardStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (user?.role) {
      case 'doctor':
        const doctorPrescriptions = prescriptions.filter(p => p.doctorId === user.id);
        const todayPrescriptions = doctorPrescriptions.filter(p => 
          new Date(p.createdAt).toDateString() === today.toDateString()
        );
        return {
          total: doctorPrescriptions.length,
          today: todayPrescriptions.length,
          pending: doctorPrescriptions.filter(p => p.status === 'pending').length,
          completed: doctorPrescriptions.filter(p => p.status === 'completed').length
        };
      
      case 'pharmacist':
        const pharmacyQueue = prescriptions.filter(p => p.status === 'pharmacy_review');
        const readyForBilling = prescriptions.filter(p => p.status === 'ready_for_billing');
        return {
          total: pharmacyQueue.length + readyForBilling.length,
          pending: pharmacyQueue.length,
          processed: readyForBilling.length,
          lowStock: medicines.filter(m => m.stock < 50).length
        };
      
      case 'cashier':
        const todayTransactions = transactions.filter(t => 
          new Date(t.createdAt).toDateString() === today.toDateString()
        );
        const todayRevenue = todayTransactions.reduce((sum, t) => sum + t.total, 0);
        return {
          total: transactions.length,
          today: todayTransactions.length,
          revenue: todayRevenue,
          pending: prescriptions.filter(p => p.status === 'ready_for_billing').length
        };
      
      default:
        return { total: 0, today: 0, pending: 0, completed: 0 };
    }
  };

  const stats = getDashboardStats();

  const getStatsCards = () => {
    switch (user?.role) {
      case 'doctor':
        return [
          { title: 'Total Prescriptions', value: stats.total, icon: FileText, color: 'blue' },
          { title: 'Today\'s Prescriptions', value: stats.today, icon: Calendar, color: 'green' },
          { title: 'Pending Review', value: stats.pending, icon: Clock, color: 'orange' },
          { title: 'Completed', value: stats.completed, icon: CheckCircle, color: 'emerald' }
        ];
      
      case 'pharmacist':
        return [
          { title: 'Pharmacy Queue', value: stats.pending, icon: Pill, color: 'blue' },
          { title: 'Ready for Billing', value: stats.processed, icon: CheckCircle, color: 'green' },
          { title: 'Low Stock Items', value: stats.lowStock, icon: AlertCircle, color: 'red' },
          { title: 'Total Processed', value: stats.total, icon: Activity, color: 'purple' }
        ];
      
      case 'cashier':
        return [
          { title: 'Today\'s Transactions', value: stats.today, icon: DollarSign, color: 'blue' },
          { title: 'Today\'s Revenue', value: `$${(stats.revenue ?? 0).toFixed(2)}`, icon: TrendingUp, color: 'green' },
          { title: 'Pending Billing', value: stats.pending, icon: Clock, color: 'orange' },
          { title: 'Total Transactions', value: stats.total, icon: Activity, color: 'purple' }
        ];
      
      default:
        return [];
    }
  };

  const statsCards = getStatsCards();

  return (
    <MainLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${card.color}-100 dark:bg-${card.color}-900`}>
                  <card.icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {prescriptions.slice(0, 5).map((prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {prescription.patient.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {prescription.diagnosis}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    prescription.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : prescription.status === 'pending'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {prescription.status.replace('_', ' ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {user?.role === 'doctor' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-700 dark:text-blue-300 font-medium">
                      Create New Prescription
                    </span>
                  </div>
                </motion.button>
              )}
              
              {user?.role === 'pharmacist' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Pill className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-green-700 dark:text-green-300 font-medium">
                        Review Prescriptions
                      </span>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="text-orange-700 dark:text-orange-300 font-medium">
                        Check Low Stock
                      </span>
                    </div>
                  </motion.button>
                </>
              )}
              
              {user?.role === 'cashier' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-purple-700 dark:text-purple-300 font-medium">
                      Process Billing
                    </span>
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}