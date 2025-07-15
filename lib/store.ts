'use client';

import { create } from 'zustand';
import { Prescription, Medicine, Transaction, Patient } from '@/types';
import { dummyPrescriptions, dummyMedicines, dummyTransactions, dummyPatients } from './dummy-data';

interface StoreState {
  prescriptions: Prescription[];
  medicines: Medicine[];
  transactions: Transaction[];
  patients: Patient[];
  theme: 'light' | 'dark';
  
  // Actions
  addPrescription: (prescription: Prescription) => void;
  updatePrescription: (id: string, updates: Partial<Prescription>) => void;
  deletePrescription: (id: string) => void;
  updateMedicine: (id: string, updates: Partial<Medicine>) => void;
  addTransaction: (transaction: Transaction) => void;
  toggleTheme: () => void;
  
  // Getters
  getPrescriptionsByDoctor: (doctorId: string) => Prescription[];
  getPrescriptionsByStatus: (status: Prescription['status']) => Prescription[];
  getPrescriptionById: (id: string) => Prescription | undefined;
}

export const useStore = create<StoreState>((set, get) => ({
  prescriptions: dummyPrescriptions,
  medicines: dummyMedicines,
  transactions: dummyTransactions,
  patients: dummyPatients,
  theme: 'light',
  
  addPrescription: (prescription) => 
    set((state) => ({ prescriptions: [...state.prescriptions, prescription] })),
  
  updatePrescription: (id, updates) => 
    set((state) => ({
      prescriptions: state.prescriptions.map(p => 
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      )
    })),
  
  deletePrescription: (id) => 
    set((state) => ({
      prescriptions: state.prescriptions.filter(p => p.id !== id)
    })),
  
  updateMedicine: (id, updates) => 
    set((state) => ({
      medicines: state.medicines.map(m => 
        m.id === id ? { ...m, ...updates } : m
      )
    })),
  
  addTransaction: (transaction) => 
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  
  toggleTheme: () => 
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  getPrescriptionsByDoctor: (doctorId) => {
    const state = get();
    return state.prescriptions.filter(p => p.doctorId === doctorId);
  },
  
  getPrescriptionsByStatus: (status) => {
    const state = get();
    return state.prescriptions.filter(p => p.status === status);
  },
  
  getPrescriptionById: (id) => {
    const state = get();
    return state.prescriptions.find(p => p.id === id);
  }
}));