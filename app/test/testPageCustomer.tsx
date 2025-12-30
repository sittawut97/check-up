'use client';

import { useState } from 'react';

import {
  Menu,
  LogOut,
  Calendar,
  User,
  Phone,
  Building,
  FileText,
  Heart,
  Eye,
  Stethoscope,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Edit,
  Save,
  X,
  Trash2,
  MapPin,
  Clock,
  FileCheck
} from 'lucide-react';

export default function CustomerBooking() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentPage, setCurrentPage] = useState('booking'); // booking, history, profile
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    checkup: false,
    eye: false,
    cardio: false
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    bookdate: '',
    date: '',
    doccardio: '',
    timecardio: '',
    doceye: '',
    timeeye: '',
    doccheckup: '',
    timecheckup: '',
    addoncheckup: [] as string[],
    addoncadio: [] as string[],
    addoninternal: [] as string[]
  });

  const [profileData, setProfileData] = useState({
    fullname: 'ทดสอบ ระบบ',
    phone: '0631784331',
    birthdate: '24/12/2540',
    gender: 'ชาย',
    company: 'PTT',
    age: 28,
    email: 'test.system@email.com',
    address: '123 ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110',
    bloodtype: 'O+'
  });

  const [editProfileData, setEditProfileData] = useState(profileData);

  const bookingHistory = [
    {
      id: 1,
      date: '15 มกราคม 2569',
      time: '08:00 - 08:30 น.',
      service: 'ตรวจตา',
      doctor: 'นพ.สมชาย ใจดี',
      status: 'เสร็จสิ้น',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      date: '10 มกราคม 2569',
      time: '10:00 - 10:30 น.',
      service: 'คลินิกตรวจสุขภาพ',
      doctor: 'นพ.วิชัย สุขภาพดี',
      status: 'เสร็จสิ้น',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      date: '5 กุมภาพันธ์ 2569',
      time: '13:00 - 13:30 น.',
      service: 'ตรวจหัวใจและหลอดเลือด',
      doctor: 'นพ.สมชาย หัวใจดี',
      status: 'กำลังรอ',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 4,
      date: '20 กุมภาพันธ์ 2569',
      time: '09:00 - 09:30 น.',
      service: 'ตรวจตา',
      doctor: 'นพ.สมหญิง รักษา',
      status: 'กำลังรอ',
      statusColor: 'bg-yellow-100 text-yellow-800'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditProfileData({
      ...editProfileData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    setProfileData(editProfileData);
    setIsEditingProfile(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCancelBooking = (id: number) => {
    alert(`ยกเลิกการนัดหมาย ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen ${showSidebar ? 'w-64' : 'w-0'} bg-[#002D56] text-white transition-all duration-300 overflow-hidden z-50 shadow-2xl`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">SiPH Health</h2>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setCurrentPage('booking')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentPage === 'booking' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              จองนัดหมาย
            </button>
            <button
              onClick={() => setCurrentPage('history')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentPage === 'history' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              ประวัติการนัด
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                currentPage === 'profile' ? 'bg-[#c99b0f]' : 'hover:bg-[#c99b0f]'
              }`}
            >
              <User className="w-5 h-5 mr-3" />
              ข้อมูลส่วนตัว
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-[#c99b0f]">
          <button type="button" className="w-full flex items-center p-3 rounded-lg hover:bg-red-600 transition">
            <LogOut className="w-5 h-5 mr-3" />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
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

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-pulse">
              <CheckCircle className="w-5 h-5" />
              บันทึกข้อมูลสำเร็จ!
            </div>
          )}

          {/* User Info Card */}
          <div className="bg-linear-to-r from-[#002D56] to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-white text-[#002D56] bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{profileData.fullname}</h2>
                <p className="text-blue-100">โปรแกรมตรวจสุขภาพ: อายุต่ำกว่า 35 ปี</p>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur rounded-xl p-6 border border-white border-opacity-20">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-300 mb-1">เบอร์มือถือ</p>
                  <p className="font-semibold text-white">{profileData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-1">วันเดือนปีเกิด</p>
                  <p className="font-semibold text-white">{profileData.birthdate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-1">เพศ</p>
                  <p className="font-semibold text-white">{profileData.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-1">บริษัท</p>
                  <p className="font-semibold text-white">{profileData.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-1">อายุ</p>
                  <p className="font-semibold text-white">{profileData.age} ปี</p>
                </div>
                <div>
                  <p className="text-sm text-gray-300 mb-1">สถานะ</p>
                  <p className="font-semibold text-white">ยืนยันแล้ว</p>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE: BOOKING */}
          {currentPage === 'booking' && (
            <div className="bg-white rounded-2xl shadow-lg p-8" id="booking">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#002D56] rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                เลือกเวลาการนัดหมายตรวจสุขภาพ
              </h2>

              <label className="text-sm text-red-800 ml-10 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-800" />
                ควรเลือกเวลานัดหมายห่างกัน 30 นาที
              </label>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* วันที่ */}
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <label className="block text-sm font-semibold text-gray-800 mb-4 items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#002D56]" />
                    วันที่ต้องการนัดหมาย
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      name="bookdate"
                      value={formData.bookdate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                      required
                    >
                      <option value="">เลือกวัน</option>
                      <option value="Monday">วันจันทร์</option>
                      <option value="Tuesday">วันอังคาร</option>
                      <option value="Wednesday">วันพุธ</option>
                      <option value="Thursday">วันพฤหัสบดี</option>
                      <option value="Friday">วันศุกร์</option>
                      <option value="Saturday">วันเสาร์</option>
                      <option value="Sunday">วันอาทิตย์</option>
                    </select>

                    <select
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      required
                      disabled={!formData.bookdate}
                    >
                      <option value="">วันที่</option>
                      <option value="2024-12-10">10 ธันวาคม 2568</option>
                      <option value="2024-12-11">11 ธันวาคม 2568</option>
                      <option value="2024-12-12">12 ธันวาคม 2568</option>
                    </select>
                  </div>
                </div>

                {/* ตรวจตา */}
                <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <button type="button" onClick={() => toggleSection('eye')} className="w-full text-left flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-gray-800 flex items-center gap-2 cursor-pointer">
                      <Eye className="w-5 h-5 text-emerald-600" />
                      ตรวจตา
                    </label>
                    {expandedSections.eye ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>

                  {expandedSections.eye && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <select
                        name="doceye"
                        value={formData.doceye}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-gray-700 font-medium hover:border-emerald-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        required
                        disabled={!formData.date}
                      >
                        <option value="">เลือกแพทย์</option>
                        <option value="นพ.สมชาย">นพ.สมชาย ใจดี</option>
                        <option value="นพ.สมหญิง">นพ.สมหญิง รักษา</option>
                      </select>

                      <select
                        name="timeeye"
                        value={formData.timeeye}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-gray-700 font-medium hover:border-emerald-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        required
                        disabled={!formData.doceye}
                      >
                        <option value="">เลือกเวลา</option>
                        <option value="08:00 - 08:30">08:00 - 08:30 น.</option>
                        <option value="08:30 - 09:00">08:30 - 09:00 น.</option>
                        <option value="09:00 - 09:30">09:00 - 09:30 น.</option>
                        <option value="09:30 - 10:00">09:30 - 10:00 น.</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* คลินิกตรวจสุขภาพ */}
                <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <button type="button" onClick={() => toggleSection('checkup')} className="w-full text-left flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-gray-800 flex items-center gap-2 cursor-pointer">
                      <Stethoscope className="w-5 h-5 text-purple-600" />
                      คลินิกตรวจสุขภาพ
                    </label>
                    {expandedSections.checkup ? (
                      <ChevronUp className="w-5 h-5 text-purple-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-600" />
                    )}
                  </button>

                  {expandedSections.checkup && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <select
                        name="doccheckup"
                        value={formData.doccheckup}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 font-medium hover:border-purple-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        required
                        disabled={!formData.date}
                      >
                        <option value="">เลือกแพทย์</option>
                        <option value="นพ.วิชัย">นพ.วิชัย สุขภาพดี</option>
                        <option value="นพ.ประเสริฐ">นพ.ประเสริฐ เก่งกาจ</option>
                      </select>

                      <select
                        name="timecheckup"
                        value={formData.timecheckup}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 font-medium hover:border-purple-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        required
                        disabled={!formData.doccheckup}
                      >
                        <option value="">เลือกเวลา</option>
                        <option value="10:00 - 10:30">10:00 - 10:30 น.</option>
                        <option value="10:30 - 11:00">10:30 - 11:00 น.</option>
                        <option value="11:00 - 11:30">11:00 - 11:30 น.</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* ตรวจหัวใจ */}
                <div className="bg-linear-to-r from-red-50 to-rose-50 rounded-xl p-6 border border-red-100">
                  <button type="button" onClick={() => toggleSection('cardio')} className="w-full text-left flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-gray-800 flex items-center gap-2 cursor-pointer">
                      <Heart className="w-5 h-5 text-red-600" />
                      ตรวจหัวใจและหลอดเลือด (ไม่บังคับ)
                    </label>
                    {expandedSections.cardio ? (
                      <ChevronUp className="w-5 h-5 text-red-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-red-600" />
                    )}
                  </button>

                  {expandedSections.cardio && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <select
                        name="doccardio"
                        value={formData.doccardio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-700 font-medium hover:border-red-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        disabled={!formData.date}
                      >
                        <option value="">เลือกแพทย์ (ไม่บังคับ)</option>
                        <option value="นพ.สมชาย">นพ.สมชาย หัวใจดี</option>
                        <option value="นพ.วิชัย">นพ.วิชัย ชีพจร</option>
                      </select>

                      <select
                        name="timecardio"
                        value={formData.timecardio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-gray-700 font-medium hover:border-red-300 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        disabled={!formData.doccardio}
                      >
                        <option value="">เลือกเวลา (ไม่บังคับ)</option>
                        <option value="13:00 - 13:30">13:00 - 13:30 น.</option>
                        <option value="13:30 - 14:00">13:30 - 14:00 น.</option>
                        <option value="14:00 - 14:30">14:00 - 14:30 น.</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-[#002D56] to-indigo-600 text-white py-4 rounded-lg font-bold hover:shadow-2xl transition duration-300 shadow-lg hover:from-[#003d7a] hover:to-indigo-700 flex items-center justify-center gap-2 text-lg cursor-pointer"
                >
                  <CheckCircle className="w-6 h-6" />
                  จองนัดหมาย
                </button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    หากเลือกวันเวลานัดหมายแล้วข้อมูลไม่ขึ้น รบกวนเลือกวันใหม่อีกครั้ง เนื่องจากอาจคิวเต็ม
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* PAGE: BOOKING HISTORY */}
          {currentPage === 'history' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#002D56] rounded-full flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  ประวัติการนัดหมาย
                </h2>

                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-[#002D56] bg-opacity-10 rounded-full flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-[#002D56]" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg">{booking.service}</h3>
                              <p className="text-sm text-gray-600">แพทย์: {booking.doctor}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-13 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar className="w-4 h-4 text-[#002D56]" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-4 h-4 text-[#002D56]" />
                              <span>{booking.time}</span>
                            </div>
                            <div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.statusColor}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {booking.status === 'กำลังรอ' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium"
                            >
                              <Trash2 className="w-4 h-4" />
                              ยกเลิก
                            </button>
                          )}
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium">
                            <FileText className="w-4 h-4" />
                            รายละเอียด
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Card */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">เสร็จสิ้น</p>
                      <p className="text-3xl font-bold text-green-600">2</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-500 opacity-50" />
                  </div>
                </div>

                <div className="bg-linear-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">กำลังรอ</p>
                      <p className="text-3xl font-bold text-yellow-600">2</p>
                    </div>
                    <Clock className="w-10 h-10 text-yellow-500 opacity-50" />
                  </div>
                </div>

                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">ทั้งหมด</p>
                      <p className="text-3xl font-bold text-blue-600">4</p>
                    </div>
                    <FileText className="w-10 h-10 text-blue-500 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE: PROFILE */}
          {currentPage === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#002D56] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    ข้อมูลส่วนตัว
                  </h2>
                  <button
                    onClick={() => {
                      setIsEditingProfile(!isEditingProfile);
                      setEditProfileData(profileData);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#002D56] text-white rounded-lg hover:bg-[#003d7a] transition font-medium"
                  >
                    {isEditingProfile ? (
                      <>
                        <X className="w-4 h-4" />
                        ยกเลิก
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4" />
                        แก้ไข
                      </>
                    )}
                  </button>
                </div>

                {!isEditingProfile ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">ชื่อ - สกุล</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.fullname}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">เบอร์มือถือ</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.phone}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">วันเดือนปีเกิด</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.birthdate}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">อายุ</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.age} ปี</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">เพศ</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.gender}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">กรุ๊ปเลือด</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.bloodtype}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">บริษัท</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.company}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">อีเมล</p>
                        <p className="font-semibold text-gray-800 text-lg">{profileData.email}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">ที่อยู่</p>
                      <p className="font-semibold text-gray-800 text-lg flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-[#002D56] shrink-0 mt-0.5" />
                        {profileData.address}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">ชื่อ - สกุล</label>
                        <input
                          type="text"
                          name="fullname"
                          value={editProfileData.fullname}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">เบอร์มือถือ</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editProfileData.phone}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">วันเดือนปีเกิด</label>
                        <input
                          type="text"
                          name="birthdate"
                          value={editProfileData.birthdate}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">อายุ</label>
                        <input
                          type="number"
                          name="age"
                          value={editProfileData.age}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">เพศ</label>
                        <select
                          name="gender"
                          value={editProfileData.gender}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                        >
                          <option value="ชาย">ชาย</option>
                          <option value="หญิง">หญิง</option>
                          <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">กรุ๊ปเลือด</label>
                        <select
                          name="bloodtype"
                          value={editProfileData.bloodtype}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">บริษัท</label>
                        <input
                          type="text"
                          name="company"
                          value={editProfileData.company}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">อีเมล</label>
                        <input
                          type="email"
                          name="email"
                          value={editProfileData.email}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">ที่อยู่</label>
                      <input
                        type="text"
                        name="address"
                        value={editProfileData.address}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 font-medium hover:border-blue-300 transition"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="w-full bg-linear-to-r from-[#002D56] to-indigo-600 text-white py-4 rounded-lg font-bold hover:shadow-2xl transition duration-300 shadow-lg hover:from-[#003d7a] hover:to-indigo-700 flex items-center justify-center gap-2 text-lg cursor-pointer"
                    >
                      <Save className="w-6 h-6" />
                      บันทึกข้อมูล
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#002D56]">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-[#002D56]" />
              หากมีข้อสงสัย ติดต่อเรา
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <Building className="w-6 h-6 text-[#002D56] shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">สถานที่</p>
                  <p className="font-medium text-sm text-gray-800">ฝ่ายการตลาด โรงพยาบาลศิริราช ปิยมหาราชการุณย์</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-[#002D56] shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">โทรศัพท์</p>
                  <p className="font-medium text-gray-800">02-419-1983 / 02-414-3630</p>
                  <p className="text-xs text-gray-600 mt-1">จันทร์-ศุกร์ 08:00 – 17:00 น.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <FileText className="w-6 h-6 text-[#002D56] shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">อีเมล</p>
                  <p className="font-medium text-gray-800 text-sm">pornparn.p@siphhospital.com</p>
                  <p className="font-medium text-gray-800 text-sm">warunyupa.p@siphhospital.com</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}