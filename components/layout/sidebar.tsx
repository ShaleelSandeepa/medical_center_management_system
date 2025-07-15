'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Pill, 
  CreditCard, 
  Users, 
  Settings, 
  Moon, 
  Sun, 
  Menu, 
  X,
  Activity,
  Clipboard,
  DollarSign
} from 'lucide-react';

export function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useStore();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const doctorMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Prescriptions', href: '/prescriptions', icon: FileText },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const pharmacistMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Pharmacy Queue', href: '/pharmacy', icon: Pill },
    { name: 'Medicines', href: '/medicines', icon: Activity },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const cashierMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Transactions', href: '/transactions', icon: DollarSign },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'doctor':
        return doctorMenuItems;
      case 'pharmacist':
        return pharmacistMenuItems;
      case 'cashier':
        return cashierMenuItems;
      default:
        return [];
    }
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`bg-white dark:bg-gray-800 h-screen shadow-lg ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              MedCenter
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {getMenuItems().map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {!isCollapsed && user && (
          <div className="mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}