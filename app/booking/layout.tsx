'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Calendar, FileText, LogOut, Menu, User } from 'lucide-react';

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  type BookingView = 'customer' | 'history' | 'profile';
  const currentView = useMemo<BookingView>(() => {
    if ((pathname ?? '').startsWith('/booking/history')) return 'history';
    if ((pathname ?? '').startsWith('/booking/profile')) return 'profile';
    return 'customer';
  }, [pathname]);

  const navigateTo = (next: BookingView) => {
    const href = next === 'customer' ? '/booking/customer' : `/booking/${next}`;
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside
        className={`fixed top-0 left-0 h-screen ${showSidebar ? 'w-64' : 'w-0'} bg-[#002D56] text-white transition-all duration-300 overflow-hidden z-50 shadow-2xl`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">SiPH Health</h2>
          </div>

          <nav className="space-y-2">
            <button
              type="button"
              onClick={() => navigateTo('customer')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentView === 'customer' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              จองนัดหมาย
            </button>
            <button
              type="button"
              onClick={() => navigateTo('history')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentView === 'history' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              ประวัติการนัด
            </button>
            <button
              type="button"
              onClick={() => navigateTo('profile')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentView === 'profile' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <User className="w-5 h-5 mr-3" />
              ข้อมูลส่วนตัว
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-[#c99b0f]">
          <Link href="/login/customer" className="w-full flex items-center p-3 rounded-lg hover:bg-red-600 transition">
            <LogOut className="w-5 h-5 mr-3" />
            ออกจากระบบ
          </Link>
        </div>
      </aside>

      <div className={`flex flex-col min-h-screen transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">ระบบนัดหมายตรวจสุขภาพ</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">ทดสอบ ระบบ</p>
                <p className="text-xs text-gray-600">0631784331</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
