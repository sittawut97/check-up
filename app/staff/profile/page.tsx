'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  FileText,
  Building,
  LogOut,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  User,
  X
} from 'lucide-react';

type StatusMessage = {
  type: 'success' | 'error';
  text: string;
};

type StaffProfile = {
  staffId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
};

const STORAGE_KEY = 'staff_profile_mock_v1';

const defaultProfile: StaffProfile = {
  staffId: '70009999',
  fullName: 'แสนดี มีที่ไหน',
  email: 'saendee.m@hospital.local',
  phone: '024191983',
  department: 'ฝ่ายการตลาด',
  role: 'Staff'
};

const normalizePhone = (value: string) => value.replace(/\D/g, '');

const loadProfileFromStorage = (): StaffProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw) as Partial<StaffProfile>;
    return { ...defaultProfile, ...parsed };
  } catch {
    return defaultProfile;
  }
};

export default function StaffProfilePage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<StaffProfile>(loadProfileFromStorage);
  const [draft, setDraft] = useState<StaffProfile>(loadProfileFromStorage);

  const canSave = useMemo(() => {
    if (!draft.staffId.trim()) return false;
    if (!draft.fullName.trim()) return false;
    if (!draft.email.trim()) return false;
    if (!draft.department.trim()) return false;
    if (!draft.role.trim()) return false;
    return true;
  }, [draft]);

  const handleStartEdit = () => {
    setDraft(profile);
    setStatusMessage(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(profile);
    setStatusMessage(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!canSave) {
      setStatusMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      return;
    }

    const next: StaffProfile = {
      ...draft,
      phone: normalizePhone(draft.phone)
    };

    setProfile(next);
    setDraft(next);
    setIsEditing(false);
    setStatusMessage({ type: 'success', text: 'บันทึกข้อมูลผู้ใช้เรียบร้อยแล้ว' });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }

    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraft((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const data = isEditing ? draft : profile;

  return (
    <div className="min-h-screen bg-gray-50">
      <aside
        className={`fixed top-0 left-0 h-screen ${showSidebar ? 'w-64' : 'w-0'} bg-[#002D56] text-white transition-all duration-300 overflow-hidden z-50 shadow-2xl`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">SiPH Nurse</h2>
          </div>
          
          <nav className="space-y-2">
            <a href="/staff/dashboard" className="flex items-center p-3 bg-[#002D56] rounded-lg hover:bg-[#c99b0f] transition">
              <Calendar className="w-5 h-5 mr-3" />
              จัดการนัดหมาย
            </a>
            <Link href="/staff/slot" className="flex items-center p-3 rounded-lg hover:bg-[#c99b0f] transition">
              <FileText className="w-5 h-5 mr-3" />
              ตัด Slot แพทย์
            </Link>
            <a href="/staff/profile" className="flex items-center p-3 rounded-lg hover:bg-[#c99b0f] transition">
              <User className="w-5 h-5 mr-3" />
              ข้อมูลผู้ใช้
            </a>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-[#ffc107]">
          <Link href="/login/staff" className="flex items-center p-3 rounded-lg hover:bg-red-600 transition">
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
              <h1 className="text-2xl font-bold text-gray-800">ข้อมูลผู้ใช้</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{profile.staffId} : {profile.fullName}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {statusMessage && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : 'bg-rose-50 text-rose-700 border-rose-100'
              }`}
            >
              {statusMessage.type === 'success' ? <ShieldCheck className="w-5 h-5" /> : <X className="w-5 h-5" />}
              <span className="text-sm font-semibold">{statusMessage.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#002D56] flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">โปรไฟล์เจ้าหน้าที่</p>
                  <p className="text-lg font-bold text-gray-900">{profile.fullName}</p>
                  <p className="text-sm text-gray-600">ID: {profile.staffId}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{profile.department}</span>
                </div>
              </div>

              <div className="mt-8">
                {!isEditing ? (
                  <button
                    onClick={handleStartEdit}
                    className="w-full bg-[#002D56] text-white py-3 rounded-xl font-semibold hover:scale-[1.01] active:scale-[0.99] transition"
                  >
                    แก้ไขข้อมูล
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCancel}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                    >
                      ยกเลิก
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!canSave}
                      className="w-full bg-[#002D56] text-white py-3 rounded-xl font-semibold hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      บันทึก
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">รายละเอียดข้อมูลผู้ใช้</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสพนักงาน</label>
                  <input
                    name="staffId"
                    value={data.staffId}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-800 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ-นามสกุล</label>
                  <input
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-800 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">อีเมล</label>
                  <input
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-800 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทร</label>
                  <input
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-800 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ฝ่าย/แผนก</label>
                  <input
                    name="department"
                    value={data.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-800 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">สิทธิ์ผู้ใช้งาน (Role)</label>
                  <input
                    name="role"
                    value={data.role}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-800 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-gray-700">
                <p className="font-semibold mb-1">หมายเหตุ</p>
                <p>หน้านี้เป็นข้อมูลตัวอย่าง (mock) และจะจำค่าไว้ในเครื่องด้วย localStorage.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}