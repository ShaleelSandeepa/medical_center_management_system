'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { useStore } from '@/lib/store';
import { MainLayout } from '@/components/layout/main-layout';
import { useToast } from '@/components/ui/toast-provider';
import { Transaction } from '@/types';
import { 
  CreditCard, 
  DollarSign, 
  Calculator, 
  Receipt, 
  User, 
  Calendar,
  Pill,
  CheckCircle,
  Printer
} from 'lucide-react';

export default function BillingPage() {
  const { user } = useAuth();
  const { prescriptions, getPrescriptionsByStatus, updatePrescription, addTransaction } = useStore();
  const { addToast } = useToast();
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'insurance'>('cash');
  const [discount, setDiscount] = useState(0);

  const readyForBilling = getPrescriptionsByStatus('ready_for_billing');
  const selectedPrescriptionData = readyForBilling.find(p => p.id === selectedPrescription);

  const calculateTotal = () => {
    if (!selectedPrescriptionData) return { subtotal: 0, tax: 0, total: 0 };
    
    const subtotal = selectedPrescriptionData.medicines.reduce((sum, med) => {
      return sum + (med.medicine.price * med.quantity);
    }, 0);
    
    const discountAmount = (subtotal * discount) / 100;
    const discountedSubtotal = subtotal - discountAmount;
    const tax = discountedSubtotal * 0.08; // 8% tax
    const total = discountedSubtotal + tax;
    
    return { subtotal, discountAmount, tax, total };
  };

  const processBilling = async () => {
    if (!selectedPrescriptionData || !user) return;

    const { subtotal, discountAmount, tax, total } = calculateTotal();
    
    const transaction: Transaction = {
      id: `trans-${Date.now()}`,
      prescriptionId: selectedPrescriptionData.id,
      prescription: selectedPrescriptionData,
      cashierId: user.id,
      cashier: user,
      subtotal,
      discount: discountAmount,
      tax,
      total,
      paymentMethod,
      invoiceNumber: `INV-${Date.now()}`,
      createdAt: new Date()
    };

    addTransaction(transaction);
    updatePrescription(selectedPrescriptionData.id, { 
      status: 'completed',
      cashierId: user.id
    });

    addToast({
      type: 'success',
      title: 'Payment processed successfully',
      description: `Invoice ${transaction.invoiceNumber} generated`
    });

    setSelectedPrescription(null);
    setDiscount(0);
  };

  const printReceipt = () => {
    if (!selectedPrescriptionData) return;
    
    const { subtotal, discountAmount, tax, total } = calculateTotal();
    
    const printContent = `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2>Medical Center</h2>
          <p>Invoice #INV-${Date.now()}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3>Patient Information</h3>
          <p><strong>Name:</strong> ${selectedPrescriptionData.patient.name}</p>
          <p><strong>Medical ID:</strong> ${selectedPrescriptionData.patient.medicalId}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3>Prescription Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid #ddd;">
                <th style="text-align: left; padding: 8px;">Medicine</th>
                <th style="text-align: right; padding: 8px;">Qty</th>
                <th style="text-align: right; padding: 8px;">Price</th>
                <th style="text-align: right; padding: 8px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${selectedPrescriptionData.medicines.map(med => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 8px;">${med.medicine.name}</td>
                  <td style="text-align: right; padding: 8px;">${med.quantity}</td>
                  <td style="text-align: right; padding: 8px;">$${med.medicine.price.toFixed(2)}</td>
                  <td style="text-align: right; padding: 8px;">$${(med.medicine.price * med.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between;">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          ${discountAmount > 0 ? `
            <div style="display: flex; justify-content: space-between;">
              <span>Discount (${discount}%):</span>
              <span>-$${discountAmount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between;">
            <span>Tax (8%):</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid #ddd; padding-top: 8px;">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div style="text-align: center;">
          <p>Payment Method: ${paymentMethod.toUpperCase()}</p>
          <p>Thank you for your visit!</p>
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
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
            Billing System
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Process payments and generate invoices
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
                  Ready for Billing
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {readyForBilling.length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Receipt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                  Today's Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  $245.50
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                  Transactions Today
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  12
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Receipt className="w-5 h-5 mr-2" />
              Pending Billing ({readyForBilling.length})
            </h3>
            <div className="space-y-3">
              {readyForBilling.map((prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPrescription === prescription.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedPrescription(prescription.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
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
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${prescription.medicines.reduce((sum, med) => sum + (med.medicine.price * med.quantity), 0).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {readyForBilling.length === 0 && (
                <div className="text-center py-8">
                  <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Billing Details
            </h3>
            
            {selectedPrescriptionData ? (
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Patient Information
                  </h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedPrescriptionData.patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedPrescriptionData.patient.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedPrescriptionData.patient.medicalId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Medicines
                  </h4>
                  <div className="space-y-2">
                    {selectedPrescriptionData.medicines.map((med) => (
                      <div key={med.medicineId} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {med.medicine.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {med.quantity} × ${med.medicine.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ${(med.medicine.price * med.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card' | 'insurance')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="insurance">Insurance</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${calculateTotal().subtotal.toFixed(2)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Discount ({discount}%):</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          -${calculateTotal().discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax (8%):</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${calculateTotal().tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                      <span className="text-gray-900 dark:text-white">Total:</span>
                      <span className="text-gray-900 dark:text-white">
                        ${calculateTotal().total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={printReceipt}
                    className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={processBilling}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Process Payment</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a prescription to bill
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose a prescription from the list to start billing
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}