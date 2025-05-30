'use client';

import { 
  LayoutDashboard, 
  BarChart2, 
  ShoppingCart, 
  Package, 
  CreditCard, 
  Truck, 
  HelpCircle, 
  Moon, 
  Sun, 
  LogOut, 
  Settings 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Orders', icon: ShoppingCart, path: '/orders' },
  { name: 'Products', icon: Package, path: '/products' },
  { name: 'Transactions', icon: CreditCard, path: '/transactions' },
  { name: 'Shipping', icon: Truck, path: '/shipping' },
  { name: 'Support', icon: HelpCircle, path: '/support' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="w-64 h-screen bg-[#131619] dark:bg-[#18181b] text-white dark:text-white p-4 flex flex-col fixed">
      <div className="flex-1">
        <nav className="flex-1">
          <ul>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full mb-2 transition-colors ${
                      isActive
                        ? "bg-[#bde8e9] text-[#131619]"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="mt-auto flex justify-between gap-6 pt-6">
        <button aria-label="Logout" className="rounded-full bg-[#23272e] hover:bg-red-600 p-3 transition-colors flex items-center justify-center">
          <LogOut className="w-5 h-5" />
        </button>
        <Link
          href="/settings"
          aria-label="Settings"
          className="rounded-full bg-[#23272e] hover:bg-[#bde8e9] p-3 transition-colors flex items-center justify-center group"
        >
          <svg className="w-5 h-5 group-hover:text-[#131619]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.01c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.01 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.01 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.01c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.572-1.01c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.01-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.01-2.572c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.01z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </Link>
      </div>
    </div>
  );
} 