'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import LoaderDots from '@/components/LoaderDots';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as UiCalendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

type StatusMessage = {
  type: 'success' | 'error';
  text: string;
};

export default function App() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    birthDate: ''
  });
  const [birthDatePickerOpen, setBirthDatePickerOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockCustomers = [
    { phone: '0631784331', birthDate: '2540-12-24' },
    { phone: '0812345678', birthDate: '2535-03-15' },
    { phone: '0898765432', birthDate: '2538-07-20' },
    { phone: '0891234567', birthDate: '2533-05-10' },
    { phone: '0823456789', birthDate: '2542-08-05' }
  ];

  const normalizePhone = (value: string) => value.replace(/\D/g, '');

  const normalizeBirthDate = (value: string) => {
    const raw = value.trim();

    // If user uses date input: YYYY-MM-DD
    // - Browser date picker will usually provide CE year (e.g. 1997-12-24)
    // - Existing mock data uses BE year (e.g. 2540-12-24)
    // Normalize to BE when year looks like CE.
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      const [yyyyStr, mm, dd] = raw.split('-');
      const yyyy = Number(yyyyStr);
      if (Number.isFinite(yyyy) && yyyy > 0 && yyyy < 2400) {
        return `${String(yyyy + 543)}-${mm}-${dd}`;
      }
      return raw;
    }

    // If user types DD/MM/YYYY (common in UI mock)
    const m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) {
      const dd = m[1].padStart(2, '0');
      const mm = m[2].padStart(2, '0');
      const yyyy = m[3];
      return `${yyyy}-${mm}-${dd}`;
    }

    return raw;
  };

  const formatThaiDate = (date: Date | undefined) => {
    if (!date) return 'เลือกวันที่';

    const thaiMonths = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const birthDateAsDate = formData.birthDate ? new Date(formData.birthDate) : undefined;

  const handleBirthDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    const iso = `${yyyy}-${mm}-${dd}`;

    setFormData((prev) => ({
      ...prev,
      birthDate: iso
    }));
    setBirthDatePickerOpen(false);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (isLoading) return;

    const phone = normalizePhone(formData.phone);
    const birthDate = normalizeBirthDate(formData.birthDate);

    if (!phone || !birthDate) {
      setStatusMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      return;
    }

    const matched = mockCustomers.some((c) => c.phone === phone && c.birthDate === birthDate);
    if (!matched) {
      setStatusMessage({ type: 'error', text: 'เบอร์โทรหรือวันเดือนปีเกิดไม่ถูกต้อง' });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: 'success', text: 'เข้าสู่ระบบสำเร็จ กำลังไปหน้าจองนัดหมาย...' });
    setTimeout(() => {
      setStatusMessage(null);
      router.push('/booking/customer');
    }, 600);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#002D56] flex items-center justify-center p-4 font-sans selection:bg-blue-100 selection:text-blue-900">
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl px-10 py-8">
            <LoaderDots />
          </div>
        </div>
      )}
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      <div className="max-w-md w-full relative z-10">

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 rounded-full animate-pulse" />
            <div className="relative flex items-center justify-center w-20 h-20 bg-linear-to-tr from-white to-blue-50 rounded-2xl shadow-2xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <User className="w-10 h-10 text-[#002D56]" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
            ยินดีต้อนรับ
          </h1>
          <p className="text-blue-100/60 font-medium">เข้าสู่ระบบสำหรับผู้มาใช้บริการ</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/98 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 relative overflow-hidden">
          {/* Status Message */}
          {statusMessage && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
              statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
            }`}>
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              <span className="text-sm font-semibold">{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-widest ml-1">
                เบอร์โทร
              </label>
              <div className="relative group border border-blue-200 rounded-2xl">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-600 text-gray-500">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 placeholder:text-gray-300 text-gray-700 font-medium"
                  placeholder="กรอกเบอร์โทร"
                />
              </div>
            </div>

            {/* Birth Date Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-widest ml-1">
                วันเดือนปีเกิด
              </label>
              <div className="relative group border border-blue-200 rounded-2xl">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-600 text-gray-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <Popover open={birthDatePickerOpen} onOpenChange={setBirthDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-4 h-auto bg-gray-50 border-2 border-transparent rounded-2xl justify-start text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-700"
                    >
                      {formatThaiDate(birthDateAsDate)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <UiCalendar
                      mode="single"
                      selected={birthDateAsDate}
                      onSelect={handleBirthDateSelect}
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      className="rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    disabled={isLoading}
                    className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all" 
                  />
                  <CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-[4px] pointer-events-none transition-opacity" />
                </div>
                <span className="ml-3 text-sm font-semibold text-gray-800 transition-colors">จดจำฉันไว้</span>
              </label>
              <button type="button" disabled={isLoading} className="text-sm text-blue-600 hover:text-blue-800 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                ลืมรหัสผ่าน?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-[#002D56] text-white py-4 rounded-2xl font-bold text-lg hover:shadow-[0_10px_30px_rgba(0,45,86,0.3)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
            >
              <div className="absolute inset-0 w-0 bg-blue-500 transition-all duration-500 ease-out group-hover:w-full opacity-10" />
              <span className="relative flex items-center justify-center gap-2">
                เข้าสู่ระบบ
              </span>
            </button>
          </form>

          {/* Register Section */}
          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              หากยังไม่มีบัญชีผู้ใช้งาน?{' '}
              <button className="text-blue-600 hover:text-blue-800 font-bold ml-1 transition-all hover:underline underline-offset-4">
                สมัครสมาชิกใหม่
              </button>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-blue-200/40 text-xs font-medium uppercase tracking-[0.2em]">
          &copy; 2024 Customer Portal • Secure Access
        </p>
      </div>
    </div>
  );
}
