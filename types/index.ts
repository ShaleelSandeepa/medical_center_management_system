export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'pharmacist' | 'cashier';
  phone: string;
  avatar?: string;
  specialization?: string;
  licenseNumber?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  medicalId: string;
  bloodType: string;
  allergies: string[];
  emergencyContact: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  category: string;
  price: number;
  stock: number;
  available: boolean;
  dosageForm: string;
  strength: string;
  instructions: string;
}

export interface PrescriptionMedicine {
  medicineId: string;
  medicine: Medicine;
  quantity: number;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patient: Patient;
  doctorId: string;
  doctor: User;
  medicines: PrescriptionMedicine[];
  symptoms: string;
  diagnosis: string;
  doctorNotes: string;
  pharmacistNotes?: string;
  status: 'pending' | 'pharmacy_review' | 'ready_for_billing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  pharmacistId?: string;
  cashierId?: string;
}

export interface Transaction {
  id: string;
  prescriptionId: string;
  prescription: Prescription;
  cashierId: string;
  cashier: User;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'insurance';
  invoiceNumber: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalPrescriptions: number;
  completedToday: number;
  pendingReview: number;
  revenue: number;
  topMedicines: { name: string; count: number }[];
  recentActivity: { action: string; time: Date; user: string }[];
}