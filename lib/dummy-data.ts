import { User, Patient, Medicine, Prescription, Transaction } from '@/types';

export const dummyUsers: User[] = [
  // Doctors
  {
    id: 'doc-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@medcenter.com',
    role: 'doctor',
    phone: '+1-555-0101',
    specialization: 'Internal Medicine',
    licenseNumber: 'MD-2019-001',
    avatar: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@medcenter.com',
    role: 'doctor',
    phone: '+1-555-0102',
    specialization: 'Cardiology',
    licenseNumber: 'MD-2020-002',
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 'doc-3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@medcenter.com',
    role: 'doctor',
    phone: '+1-555-0103',
    specialization: 'Pediatrics',
    licenseNumber: 'MD-2021-003',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  // Pharmacists
  {
    id: 'pharm-1',
    name: 'James Wilson',
    email: 'james.wilson@medcenter.com',
    role: 'pharmacist',
    phone: '+1-555-0201',
    licenseNumber: 'RPH-2018-001',
    avatar: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 'pharm-2',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@medcenter.com',
    role: 'pharmacist',
    phone: '+1-555-0202',
    licenseNumber: 'RPH-2019-002',
    avatar: 'https://images.pexels.com/photos/5452297/pexels-photo-5452297.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  // Cashiers
  {
    id: 'cash-1',
    name: 'Robert Davis',
    email: 'robert.davis@medcenter.com',
    role: 'cashier',
    phone: '+1-555-0301',
    avatar: 'https://images.pexels.com/photos/5452299/pexels-photo-5452299.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: 'cash-2',
    name: 'Maria Garcia',
    email: 'maria.garcia@medcenter.com',
    role: 'cashier',
    phone: '+1-555-0302',
    avatar: 'https://images.pexels.com/photos/5452273/pexels-photo-5452273.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

export const dummyPatients: Patient[] = [
  {
    id: 'pat-1',
    name: 'John Smith',
    age: 45,
    gender: 'male',
    phone: '+1-555-1001',
    email: 'john.smith@email.com',
    address: '123 Main St, Cityville, ST 12345',
    medicalId: 'MED-001',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    emergencyContact: '+1-555-1002'
  },
  {
    id: 'pat-2',
    name: 'Emma Johnson',
    age: 32,
    gender: 'female',
    phone: '+1-555-1003',
    email: 'emma.johnson@email.com',
    address: '456 Oak Ave, Townsburg, ST 12346',
    medicalId: 'MED-002',
    bloodType: 'B+',
    allergies: ['Shellfish'],
    emergencyContact: '+1-555-1004'
  },
  {
    id: 'pat-3',
    name: 'Michael Brown',
    age: 28,
    gender: 'male',
    phone: '+1-555-1005',
    email: 'michael.brown@email.com',
    address: '789 Pine Rd, Villagetown, ST 12347',
    medicalId: 'MED-003',
    bloodType: 'O-',
    allergies: [],
    emergencyContact: '+1-555-1006'
  },
  {
    id: 'pat-4',
    name: 'Sarah Davis',
    age: 38,
    gender: 'female',
    phone: '+1-555-1007',
    email: 'sarah.davis@email.com',
    address: '321 Elm St, Hamlet, ST 12348',
    medicalId: 'MED-004',
    bloodType: 'AB+',
    allergies: ['Latex', 'Aspirin'],
    emergencyContact: '+1-555-1008'
  },
  {
    id: 'pat-5',
    name: 'David Wilson',
    age: 55,
    gender: 'male',
    phone: '+1-555-1009',
    email: 'david.wilson@email.com',
    address: '654 Maple Dr, Borough, ST 12349',
    medicalId: 'MED-005',
    bloodType: 'A-',
    allergies: ['Codeine'],
    emergencyContact: '+1-555-1010'
  }
];

export const dummyMedicines: Medicine[] = [
  {
    id: 'med-1',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    manufacturer: 'PharmaCorp',
    category: 'Antibiotic',
    price: 12.99,
    stock: 150,
    available: true,
    dosageForm: 'Capsule',
    strength: '500mg',
    instructions: 'Take with food'
  },
  {
    id: 'med-2',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    manufacturer: 'CardioMed',
    category: 'ACE Inhibitor',
    price: 8.50,
    stock: 200,
    available: true,
    dosageForm: 'Tablet',
    strength: '10mg',
    instructions: 'Take once daily'
  },
  {
    id: 'med-3',
    name: 'Metformin',
    genericName: 'Metformin HCl',
    manufacturer: 'DiabetesRx',
    category: 'Antidiabetic',
    price: 15.75,
    stock: 180,
    available: true,
    dosageForm: 'Tablet',
    strength: '500mg',
    instructions: 'Take with meals'
  },
  {
    id: 'med-4',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    manufacturer: 'PainRelief Inc',
    category: 'NSAID',
    price: 6.25,
    stock: 300,
    available: true,
    dosageForm: 'Tablet',
    strength: '200mg',
    instructions: 'Take with food or milk'
  },
  {
    id: 'med-5',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    manufacturer: 'GastroHealth',
    category: 'Proton Pump Inhibitor',
    price: 22.40,
    stock: 120,
    available: true,
    dosageForm: 'Capsule',
    strength: '20mg',
    instructions: 'Take before meals'
  }
];

export const dummyPrescriptions: Prescription[] = [
  {
    id: 'presc-1',
    patientId: 'pat-1',
    patient: dummyPatients[0],
    doctorId: 'doc-1',
    doctor: dummyUsers[0],
    medicines: [
      {
        medicineId: 'med-1',
        medicine: dummyMedicines[0],
        quantity: 30,
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '10 days',
        instructions: 'Take with food'
      }
    ],
    symptoms: 'Bacterial infection, fever, sore throat',
    diagnosis: 'Streptococcal pharyngitis',
    doctorNotes: 'Patient should complete full course of antibiotics',
    status: 'pending',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 'presc-2',
    patientId: 'pat-2',
    patient: dummyPatients[1],
    doctorId: 'doc-2',
    doctor: dummyUsers[1],
    medicines: [
      {
        medicineId: 'med-2',
        medicine: dummyMedicines[1],
        quantity: 30,
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning'
      }
    ],
    symptoms: 'High blood pressure, headaches',
    diagnosis: 'Hypertension',
    doctorNotes: 'Monitor blood pressure regularly',
    status: 'pharmacy_review',
    createdAt: new Date('2024-01-15T14:15:00Z'),
    updatedAt: new Date('2024-01-15T15:00:00Z'),
    pharmacistId: 'pharm-1'
  }
];

export const dummyTransactions: Transaction[] = [
  {
    id: 'trans-1',
    prescriptionId: 'presc-2',
    prescription: dummyPrescriptions[1],
    cashierId: 'cash-1',
    cashier: dummyUsers[5],
    subtotal: 8.50,
    discount: 0,
    tax: 0.68,
    total: 9.18,
    paymentMethod: 'card',
    invoiceNumber: 'INV-2024-001',
    createdAt: new Date('2024-01-15T16:30:00Z')
  }
];

// Auth helper functions
export const authenticateUser = (email: string, password: string): User | null => {
  // Simple dummy authentication
  const user = dummyUsers.find(u => u.email === email);
  if (user && password === 'password123') {
    return user;
  }
  return null;
};

export const getUserById = (id: string): User | null => {
  return dummyUsers.find(u => u.id === id) || null;
};