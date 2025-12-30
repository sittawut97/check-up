'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Calendar, FileText, LogOut, Menu, User } from 'lucide-react';

export default function NurseLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  type NurseView = 'dashboard' | 'slot' | 'profile';
  const currentView = useMemo<NurseView>(() => {
    if ((pathname ?? '').startsWith('/nurse/slot')) return 'slot';
    if ((pathname ?? '').startsWith('/nurse/profile')) return 'profile';
    return 'dashboard';
  }, [pathname]);

  const navigateTo = (next: NurseView) => {
    const href = next === 'dashboard' ? '/nurse/dashboard' : `/nurse/${next}`;
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen ${showSidebar ? 'w-64' : 'w-0'} bg-[#002D56] text-white transition-all duration-300 overflow-hidden z-50 shadow-2xl`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">SiPH Nurse</h2>
          </div>

          <nav className="space-y-2">
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentView === 'dashboard' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              จัดการนัดหมาย
            </button>
            <button
              type="button"
              onClick={() => navigateTo('slot')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentView === 'slot' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              ตัด Slot แพทย์
            </button>
            <button
              type="button"
              onClick={() => navigateTo('profile')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentView === 'profile' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <User className="w-5 h-5 mr-3" />
              ข้อมูลผู้ใช้
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-[#ffc107]">
          <Link href="/login/nurse" className="flex items-center p-3 rounded-lg hover:bg-red-600 transition">
            <LogOut className="w-5 h-5 mr-3" />
            ออกจากระบบ
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {currentView === 'dashboard' && 'จัดการนัดหมายตรวจสุขภาพ'}
                {currentView === 'slot' && 'ตัด Slot แพทย์'}
                {currentView === 'profile' && 'ข้อมูลผู้ใช้'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">70009999 : แสนดี มีที่ไหน</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
