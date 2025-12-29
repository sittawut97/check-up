'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LuNotebookText } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Phone, 
  Building, 
  FileText,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AppointmentItem {
  program: string;
  doctor: string;
  time: string;
  location: string;
}

interface BookingData {
  id: string;
  phone: string;
  name: string;
  birthday: string;
  gender: string;
  company: string;
  bookdate: string;
  date: string;
  appointments: AppointmentItem[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export default function StaffDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const itemsPerPage = 10;

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (showAddModal || showViewModal || showEditModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAddModal, showViewModal, showEditModal]);

  // Create particles effect
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
        size: Math.random() * 3 + 2
      });
    }
    return particles;
  };

  // Toggle card expansion
  const toggleCard = (bookingId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [bookingId]: !prev[bookingId]
    }));
  };

  // Modal handlers
  const handleViewDetails = (booking: BookingData) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  const handleEdit = (booking: BookingData) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedBooking(null);
  };

  // ข้อมูลตัวอย่าง - รองรับหลายโปรแกรมและหลายแพทย์
  const [bookings, setBookings] = useState<BookingData[]>([
    {
      id: 'BK001',
      phone: '0631784331',
      name: 'สมชาย ใจดี',
      birthday: '24/12/2540',
      gender: 'ชาย',
      company: 'บริษัท ABC จำกัด',
      bookdate: 'จันทร์',
      date: '10/12/2568',
      appointments: [
        { program: 'ตรวจสุขภาพทั่วไป', doctor: 'นพ.สมชาย วงศ์ใหญ่', time: '09:00', location: 'ห้องตรวจ 1' },
        { program: 'ตรวจตา', doctor: 'พญ.สุดา ใสสะอาด', time: '10:30', location: 'ห้องตรวจตา' }
      ],
      status: 'confirmed',
      notes: 'ผู้ป่วยมีประวัติความดันสูง'
    },
    {
      id: 'BK002',
      phone: '0812345678',
      name: 'สมหญิง รักสุขภาพ',
      birthday: '15/03/2535',
      gender: 'หญิง',
      company: 'บริษัท XYZ จำกัด',
      bookdate: 'อังคาร',
      date: '11/12/2568',
      appointments: [
        { program: 'ตรวจสุขภาพผู้บริหาร', doctor: 'นพ.ประยุทธ์ มั่นคง', time: '08:00', location: 'ห้อง VIP 1' },
        { program: 'ตรวจหัวใจและหลอดเลือด', doctor: 'นพ.วิชัย หัวใจดี', time: '10:00', location: 'ศูนย์หัวใจ' },
        { program: 'ตรวจมะเร็ง', doctor: 'พญ.มาลี ดอกไม้', time: '13:00', location: 'ห้องตรวจ 3' }
      ],
      status: 'pending'
    },
    {
      id: 'BK003',
      phone: '0898765432',
      name: 'วิชัย สุขใจ',
      birthday: '20/07/2538',
      gender: 'ชาย',
      company: 'บริษัท DEF จำกัด',
      bookdate: 'พุธ',
      date: '12/12/2568',
      appointments: [
        { program: 'ตรวจสุขภาพประจำปี', doctor: 'พญ.สุดา แสงจันทร์', time: '14:00', location: 'ห้องตรวจ 2' }
      ],
      status: 'completed'
    },
    {
      id: 'BK004',
      phone: '0891234567',
      name: 'ประภา สวยงาม',
      birthday: '10/05/2533',
      gender: 'หญิง',
      company: 'บริษัท GHI จำกัด',
      bookdate: 'พฤหัสบดี',
      date: '13/12/2568',
      appointments: [
        { program: 'ตรวจสุขภาพทั่วไป', doctor: 'นพ.สมชาย วงศ์ใหญ่', time: '09:30', location: 'ห้องตรวจ 1' },
        { program: 'ตรวจฟัน', doctor: 'ทพญ.วิไล ยิ้มสวย', time: '11:00', location: 'คลินิกทันตกรรม' }
      ],
      status: 'confirmed',
      notes: 'ขอใบรับรองแพทย์'
    },
    {
      id: 'BK005',
      phone: '0823456789',
      name: 'ธนา รวยมาก',
      birthday: '05/08/2542',
      gender: 'ชาย',
      company: 'บริษัท JKL จำกัด',
      bookdate: 'ศุกร์',
      date: '14/12/2568',
      appointments: [
        { program: 'ตรวจสุขภาพผู้บริหาร', doctor: 'นพ.ประยุทธ์ มั่นคง', time: '08:30', location: 'ห้อง VIP 2' }
      ],
      status: 'pending'
    }
  ]);

  // ฟังก์ชันค้นหา
  const filteredBookings = bookings.filter(booking => {
    const matchSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm) ||
      booking.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchSearch && matchStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'รอยืนยัน';
      case 'confirmed': return 'ยืนยันแล้ว';
      case 'completed': return 'เสร็จสิ้น';
      case 'cancelled': return 'ยกเลิก';
      default: return status;
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
      setBookings(bookings.filter(b => b.id !== id));
      alert('ลบข้อมูลเรียบร้อยแล้ว');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed */}
      <aside className={`fixed top-0 left-0 h-screen ${showSidebar ? 'w-64' : 'w-0'} bg-[#002D56] text-white transition-all duration-300 overflow-hidden z-50 shadow-2xl`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">SiPH Nurse</h2>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center p-3 bg-[#002D56] rounded-lg hover:bg-[#c99b0f] transition">
              <Calendar className="w-5 h-5 mr-3" />
              จัดการนัดหมาย
            </a>
            <Link href="/staff/slot" className="flex items-center p-3 rounded-lg hover:bg-[#c99b0f] transition">
              <FileText className="w-5 h-5 mr-3" />
              ตัด Slot แพทย์
            </Link>
            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-[#c99b0f] transition">
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

      {/* Main Content - Adjusted for fixed sidebar */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">จัดการนัดหมายตรวจสุขภาพ</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">70009999 : แสนดี มีที่ไหน</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาด้วย ชื่อ, เบอร์โทร, หรือบริษัท..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                >
                  <option value="all">สถานะทั้งหมด</option>
                  <option value="pending">รอยืนยัน</option>
                  <option value="confirmed">ยืนยันแล้ว</option>
                  <option value="completed">เสร็จสิ้น</option>
                  <option value="cancelled">ยกเลิก</option>
                </select>
              </div>
            </div>

            {/* Add New Button */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                พบ {filteredBookings.length} รายการ
              </p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-[#002D56] text-white rounded-lg hover:scale-105 active:scale-95 transition shadow-md"
              >
                <Plus className="w-5 h-5 mr-2" />
                เพิ่มนัดหมายใหม่
              </button>
            </div>
          </div>

          {/* Card List View - สวยงามและรองรับหลายโปรแกรม */}
          <div className="space-y-4">
            {currentBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Header Card */}
                <div className="bg-[#002D56] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-[#002D56]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{booking.name}</h3>
                        <p className="text-sm text-indigo-100">HN: {booking.id} <br /> เบอร์โทร: {booking.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(booking)}
                          className="p-2 bg-green-600 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95" 
                          title="ดูรายละเอียด"
                        >
                          <LuNotebookText className="w-5 h-5 text-white" />
                        </button>
                        <button 
                          onClick={() => handleEdit(booking)}
                          className="p-2 bg-[#c99b0f] bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95" 
                          title="แก้ไข"
                        >
                          <AiFillEdit className="w-5 h-5 text-white" />
                        </button>
                        <button 
                          onClick={() => handleDelete(booking.id)}
                          className="p-2 bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95" 
                          title="ลบ"
                        >
                          <MdDeleteForever className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body Card */}
                <div className="p-6">
                  {/* ข้อมูลทั่วไป */}
                  <div className="grid grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">บริษัท</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">วันที่นัด</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.date}</p>
                        <p className="text-xs text-gray-500">{booking.bookdate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">ข้อมูลส่วนตัว</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.gender} • {booking.birthday}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">จำนวนโปรแกรม</p>
                        <p className="text-sm font-semibold text-[#002D56]">{booking.appointments.length} โปรแกรม</p>
                      </div>
                    </div>
                  </div>

                  {/* รายการนัดหมาย - Accordion Style */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleCard(booking.id)}
                      className="w-full bg-linear-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 border border-indigo-200 rounded-lg px-4 py-3 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span className="flex items-center font-semibold text-gray-800">
                        <FileText className="w-5 h-5 mr-2 text-[#002D56]" />
                        รายการตรวจ ({booking.appointments.length} โปรแกรม)
                      </span>
                      {expandedCards[booking.id] ? 
                        <ChevronUp className="w-5 h-5 text-[#002D56]" /> : 
                        <ChevronDown className="w-5 h-5 text-[#002D56]" />
                      }
                    </button>
                    
                    {expandedCards[booking.id] && (
                      <div className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                        {booking.appointments.map((apt, index) => (
                          <div key={index} className="ml-2 p-4 bg-white border-l-4 border-indigo-400 rounded-r-lg shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 flex-1">
                                <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
                                  <span className="text-sm font-bold text-[#002D56]">{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-gray-900">{apt.program}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    <span className="inline-flex items-center">
                                      <User className="w-3 h-3 mr-1" />
                                      {apt.doctor}
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span className="inline-flex items-center">
                                      <Building className="w-3 h-3 mr-1" />
                                      {apt.location}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="px-4 py-2 bg-linear-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 shadow-sm">
                                  <p className="text-xs text-gray-500">เวลา</p>
                                  <p className="text-sm font-bold text-[#002D56]">{apt.time}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* หมายเหตุ */}
                  {booking.notes && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs text-amber-800">
                        <span className="font-semibold">📝 หมายเหตุ:</span> {booking.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 bg-white rounded-lg shadow-sm px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                แสดง {startIndex + 1} ถึง {Math.min(endIndex, filteredBookings.length)} จาก {filteredBookings.length} รายการ
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-lg transition ${
                      currentPage === page
                        ? 'bg-[#002D56] text-white border-[#002D56]'
                        : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Particles Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.6;
          pointer-events: none;
          animation: float infinite ease-in-out;
        }
      `}</style>

      {/* Modal: เพิ่มนัดหมายใหม่ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-80 flex items-center justify-center z-100 p-4">
          {/* Particles Background */}
          {createParticles().map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden relative z-10">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#002D56] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center">
                <Plus className="w-6 h-6 mr-2" />
                เพิ่มนัดหมายใหม่
              </h2>
              <button 
                onClick={closeAllModals}
                className="p-2 hover:bg-white hover:bg-opacity-20 hover:text-[#002D56] rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ-นามสกุล</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none placeholder:text-gray-400 text-gray-800"
                    placeholder="กรอกชื่อ-นามสกุล"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none placeholder:text-gray-400 text-gray-800"
                    placeholder="กรอกเบอร์โทรศัพท์"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันเกิด</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none placeholder:text-gray-400 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">เพศ</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-800">
                    <option>ชาย</option>
                    <option>หญิง</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">บริษัท</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none placeholder:text-gray-400 text-gray-800"
                    placeholder="กรอกชื่อบริษัท"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่นัด</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none placeholder:text-gray-400 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">สถานะ</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-800">
                    <option value="pending">รอยืนยัน</option>
                    <option value="confirmed">ยืนยันแล้ว</option>
                    <option value="completed">เสร็จสิ้น</option>
                    <option value="cancelled">ยกเลิก</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">หมายเหตุ</label>
                  <textarea 
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none placeholder:text-gray-400 text-gray-800"
                    placeholder="กรอกหมายเหตุ (ถ้ามี)"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={closeAllModals}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={closeAllModals}
                  className="px-6 py-2 bg-[#002D56] text-white rounded-lg hover:scale-105 active:scale-95 transition shadow-md"
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: ดูรายละเอียด */}
      {showViewModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-80 flex items-center justify-center z-100 p-4">
          {/* Particles Background */}
          {createParticles().map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden relative z-10">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#002D56] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center">
                <LuNotebookText className="w-6 h-6 mr-2" />
                รายละเอียดการนัดหมาย
              </h2>
              <button 
                onClick={closeAllModals}
                className="p-2 hover:bg-white hover:bg-opacity-20 hover:text-[#002D56] rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* ข้อมูลผู้นัดหมาย */}
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-[#002D56]" />
                  ข้อมูลผู้นัดหมาย
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">รหัสการนัด</p>
                    <p className="text-base font-semibold text-gray-900">{selectedBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ชื่อ-นามสกุล</p>
                    <p className="text-base font-semibold text-gray-900">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">เบอร์โทรศัพท์</p>
                    <p className="text-base font-semibold text-gray-900">{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">วันเกิด</p>
                    <p className="text-base font-semibold text-gray-900">{selectedBooking.birthday}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">เพศ</p>
                    <p className="text-base font-semibold text-gray-900">{selectedBooking.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">บริษัท</p>
                    <p className="text-base font-semibold text-gray-900">{selectedBooking.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">วันที่นัด</p>
                    <p className="text-base font-semibold text-gray-900">{selectedBooking.date} ({selectedBooking.bookdate})</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">สถานะ</p>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                      {getStatusText(selectedBooking.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* รายการตรวจ */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#002D56]" />
                  รายการตรวจ ({selectedBooking.appointments.length} โปรแกรม)
                </h3>
                <div className="space-y-3">
                  {selectedBooking.appointments.map((apt, index) => (
                    <div key={index} className="bg-white border-l-4 border-[#002D56] rounded-r-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
                            <span className="text-sm font-bold text-[#002D56]">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-base font-semibold text-gray-900">{apt.program}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="inline-flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {apt.doctor}
                              </span>
                              <span className="mx-2">•</span>
                              <span className="inline-flex items-center">
                                <Building className="w-4 h-4 mr-1" />
                                {apt.location}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-linear-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                          <p className="text-xs text-gray-600">เวลา</p>
                          <p className="text-base font-bold text-[#002D56]">{apt.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* หมายเหตุ */}
              {selectedBooking.notes && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">📝 หมายเหตุ:</span> {selectedBooking.notes}
                  </p>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex justify-end pt-6 border-t mt-6">
                <button 
                  onClick={closeAllModals}
                  className="px-6 py-2 bg-[#002D56] text-white rounded-lg hover:scale-105 active:scale-95 transition shadow-md"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: แก้ไข */}
      {showEditModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-80 flex items-center justify-center z-100 p-4">
          {/* Particles Background */}
          {createParticles().map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden relative z-10">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#002D56] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold flex items-center">
                <AiFillEdit className="w-6 h-6 mr-2" />
                แก้ไขการนัดหมาย
              </h2>
              <button 
                onClick={closeAllModals}
                className="p-2 hover:bg-white hover:bg-opacity-20 hover:text-[#002D56] rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">รหัสการนัด</label>
                  <input 
                    type="text" 
                    defaultValue={selectedBooking.id}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ-นามสกุล</label>
                  <input 
                    type="text" 
                    defaultValue={selectedBooking.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                  <input 
                    type="tel" 
                    defaultValue={selectedBooking.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันเกิด</label>
                  <input 
                    type="text" 
                    defaultValue={selectedBooking.birthday}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">เพศ</label>
                  <select 
                    defaultValue={selectedBooking.gender}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  >
                    <option>ชาย</option>
                    <option>หญิง</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">บริษัท</label>
                  <input 
                    type="text" 
                    defaultValue={selectedBooking.company}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่นัด</label>
                  <input 
                    type="text" 
                    defaultValue={selectedBooking.date}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">สถานะ</label>
                  <select 
                    defaultValue={selectedBooking.status}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  >
                    <option value="pending">รอยืนยัน</option>
                    <option value="confirmed">ยืนยันแล้ว</option>
                    <option value="completed">เสร็จสิ้น</option>
                    <option value="cancelled">ยกเลิก</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">หมายเหตุ</label>
                  <textarea 
                    rows={3}
                    defaultValue={selectedBooking.notes}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={closeAllModals}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={closeAllModals}
                  className="px-6 py-2 bg-[#002D56] text-white rounded-lg hover:scale-105 active:scale-95 transition shadow-md"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
