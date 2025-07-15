'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { useStore } from '@/lib/store';
import { MainLayout } from '@/components/layout/main-layout';
import { useToast } from '@/components/ui/toast-provider';
import { 
  Pill, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  FileText,
  ArrowRight,
  Package,
  Calendar
} from 'lucide-react';

export default function PharmacyPage() {
  const { user } = useAuth();
  const { prescriptions, getPrescriptionsByStatus, updatePrescription, medicines } = useStore();
  const { addToast } = useToast();
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);

  const pharmacyQueue = getPrescriptionsByStatus('pharmacy_review');
  const readyForBilling = getPrescriptionsByStatus('ready_for_billing');

  const markAsAvailable = (prescriptionId: string) => {
    updatePrescription(prescriptionId, { 
      status: 'ready_for_billing',
      pharmacistId: user?.id
    });
    addToast({
      type: 'success',
      title: 'Prescription processed',
      description: 'Prescription has been marked as ready for billing'
    });
  };

  const markAsUnavailable = (prescriptionId: string) => {
    updatePrescription(prescriptionId, { 
      status: 'pending',
      pharmacistNotes: 'Some medicines are currently unavailable'
    });
    addToast({
      type: 'error',
      title: 'Medicines unavailable',
      description: 'Prescription returned to pending status'
    });
  };

  const getStockStatus = (medicineId: string) => {
    const medicine = medicines.find(m => m.id === medicineId);
    if (!medicine) return 'unavailable';
    if (medicine.stock === 0) return 'out_of_stock';
    if (medicine.stock < 50) return 'low_stock';
    return 'available';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'low_stock':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
      case 'out_of_stock':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Pharmacy Queue
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review prescriptions and check medicine availability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pharmacyQueue.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Ready for Billing
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {readyForBilling.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Low Stock Items
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {medicines.filter(m => m.stock < 50).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Pending Review ({pharmacyQueue.length})
            </h3>
            <div className="space-y-4">
              {pharmacyQueue.map((prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {prescription.patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {prescription.patient.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {prescription.diagnosis}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(prescription.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Medicines:
                    </p>
                    <div className="space-y-2">
                      {prescription.medicines.map((med) => {
                        const stockStatus = getStockStatus(med.medicineId);
                        return (
                          <div
                            key={med.medicineId}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-600 rounded"
                          >
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {med.medicine.name}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                {med.quantity} × {med.dosage}
                              </span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStockColor(stockStatus)}`}>
                              {stockStatus.replace('_', ' ')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => markAsUnavailable(prescription.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition-colors"
                    >
                      Mark Unavailable
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => markAsAvailable(prescription.id)}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 transition-colors flex items-center space-x-2"
                    >
                      <span>Send to Billing</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
              
              {pharmacyQueue.length === 0 && (
                <div className="text-center py-8">
                  <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No prescriptions pending review
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    All prescriptions have been processed
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Ready for Billing ({readyForBilling.length})
            </h3>
            <div className="space-y-4">
              {readyForBilling.map((prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="border border-green-200 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-green-900/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {prescription.patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {prescription.patient.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {prescription.medicines.length} medicine(s)
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Processed by {prescription.pharmacistId === user?.id ? 'you' : 'pharmacist'}
                  </p>
                </motion.div>
              ))}
              
              {readyForBilling.length === 0 && (
                <div className="text-center py-8">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No prescriptions ready for billing
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Processed prescriptions will appear here
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}