'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Building, Calendar, CheckCircle, Clock, FileCheck, FileText, Phone, Trash2, X } from 'lucide-react';
import Swal from 'sweetalert2';

type BookingItem = {
  id: number;
  date: string;
  time: string;
  service: string;
  doctor: string;
  status: 'เสร็จสิ้น' | 'กำลังรอ';
  statusColor: string;
};

type Particle = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
};

export default function BookingHistoryPage() {
  const [bookingHistory, setBookingHistory] = useState<BookingItem[]>([
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
  ]);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [isClosingDetailsModal, setIsClosingDetailsModal] = useState(false);
  const modalElRef = useRef<HTMLDivElement | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (showDetailsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDetailsModal]);

  useEffect(() => {
    if (!showDetailsModal) return;
    const el = modalElRef.current;
    if (!el) return;

    // Ensure the element starts from "below + transparent" and then animates to visible.
    el.classList.add('opacity-0', 'translate-y-6');
    const raf = window.requestAnimationFrame(() => {
      el.classList.remove('opacity-0', 'translate-y-6');
    });
    return () => window.cancelAnimationFrame(raf);
  }, [showDetailsModal]);

  // Create particles effect
  const seeded = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const particles = useMemo<Particle[]>(() => {
    if (!showDetailsModal) return [];

    const next: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      const r1 = seeded(i * 17 + 1);
      const r2 = seeded(i * 17 + 2);
      const r3 = seeded(i * 17 + 3);
      const r4 = seeded(i * 17 + 4);
      const r5 = seeded(i * 17 + 5);
      next.push({
        id: i,
        left: r1 * 100,
        top: r2 * 100,
        delay: r3 * 2,
        duration: 2 + r4 * 3,
        size: 2 + r5 * 6
      });
    }
    return next;
  }, [showDetailsModal]);

  const handleViewDetails = (booking: BookingItem) => {
    setSelectedBooking(booking);
    setIsClosingDetailsModal(false);
    setShowDetailsModal(true);
  };

  const handleCancelBooking = async (id: number) => {
  const result = await Swal.fire({
        title: 'ยกเลิกการนัดหมาย',
        text: `ยกเลิกการนัดหมาย ID: ${id} ใช่หรือไม่?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ยกเลิก',
        allowOutsideClick: false,
        allowEscapeKey: false,
        heightAuto: false,
        didOpen: () => {
        document.body.style.overflow = 'hidden';
        },
        willClose: () => {
        document.body.style.overflow = '';
        },
    });

    if (result.isConfirmed) {
        setBookingHistory((prev) => prev.filter((b) => b.id !== id));

        await Swal.fire({
        title: 'สำเร็จ',
        text: 'ยกเลิกการนัดหมายสำเร็จ',
        icon: 'success',
        confirmButtonColor: '#002D56',
        allowOutsideClick: false,
        heightAuto: false,
        didOpen: () => {
            document.body.style.overflow = 'hidden';
        },
        willClose: () => {
            document.body.style.overflow = '';
        },
        });
    }
  };


  const closeModal = () => {
    setIsClosingDetailsModal(true);
    window.setTimeout(() => {
      setShowDetailsModal(false);
      setSelectedBooking(null);
      setIsClosingDetailsModal(false);
    }, 220);
  };

  return (
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
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{booking.service}</h3>
                      <p className="text-sm text-gray-600">แพทย์: {booking.doctor}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-13 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-white" />
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
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    รายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">เสร็จสิ้น</p>
              <p className="text-3xl font-bold text-green-600">
                {bookingHistory.filter((b) => b.status === 'เสร็จสิ้น').length}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">กำลังรอ</p>
              <p className="text-3xl font-bold text-yellow-600">
                {bookingHistory.filter((b) => b.status === 'กำลังรอ').length}
              </p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500 opacity-50" />
          </div>
        </div>

        <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">ทั้งหมด</p>
              <p className="text-3xl font-bold text-blue-600">{bookingHistory.length}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-500 opacity-50" />
          </div>
        </div>
      </div>

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

      {/* Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center z-100 p-4">
          <button
            type="button"
            aria-label="Close modal"
            onClick={closeModal}
            className={`absolute inset-0 bg-black/80 bg-opacity-80 transition-opacity duration-200 ${
              isClosingDetailsModal ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Particles Background */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
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
          </div>

          {/* Modal Content */}
          <div
            ref={modalElRef}
            className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative z-10 transform transition-all duration-200 ${
              isClosingDetailsModal ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Modal Header - Fixed */}
            <div className="bg-[#002D56] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl shrink-0">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileCheck className="w-6 h-6" />
                รายละเอียดการนัดหมาย
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
              >
                <X className="w-6 h-6 text-white hover:text-[#002D56]" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="overflow-y-auto flex-1 p-8 space-y-6">
              {/* Booking Info Card */}
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#002D56]" />
                  ข้อมูลการนัดหมาย
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">รหัสการนัด</p>
                    <p className="text-lg font-bold text-gray-900">BK{String(selectedBooking.id).padStart(3, '0')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">สถานะ</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${selectedBooking.statusColor}`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="border-l-4 border-[#002D56] pl-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{selectedBooking.service}</h3>
                <p className="text-gray-600 mb-4">แพทย์: <span className="font-semibold text-gray-800">{selectedBooking.doctor}</span></p>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-[#002D56]" />
                    <p className="text-sm text-gray-600">วันที่นัดหมาย</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedBooking.date}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#002D56]" />
                    <p className="text-sm text-gray-600">เวลา</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedBooking.time}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">💡 หมายเหตุ:</span> โปรดมาถึงก่อนเวลานัดหมาย 10-15 นาที เพื่อให้มีเวลาในการลงทะเบียน
                </p>
              </div>

              {/* More Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-gray-800">ข้อมูลเพิ่มเติม</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ประเภทการตรวจ:</span>
                    <span className="font-semibold text-gray-900">{selectedBooking.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">แพทย์ผู้ตรวจ:</span>
                    <span className="font-semibold text-gray-900">{selectedBooking.doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ระยะเวลาการตรวจ:</span>
                    <span className="font-semibold text-gray-900">{selectedBooking.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="border-t bg-gray-50 px-8 py-4 rounded-b-2xl flex gap-3 shrink-0">
              {selectedBooking.status === 'กำลังรอ' && (
                <button
                  onClick={() => {
                    handleCancelBooking(selectedBooking.id);
                    closeModal();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
                >
                  <Trash2 className="w-5 h-5" />
                  ยกเลิกการนัดหมาย
                </button>
              )}
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-3 bg-[#002D56] text-white rounded-lg hover:scale-105 active:scale-95 transition font-semibold"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Float Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 0.3; }
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
    </div>
  );
}