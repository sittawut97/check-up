'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
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
  Edit
} from 'lucide-react';

declare global {
  interface Window {
    Swal: any;
  }
}

export default function CustomerBooking() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    checkup: false,
    eye: false,
    cardio: false
  });

  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    // โหลด SweetAlert2 จาก CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.async = true;
    document.body.appendChild(script);
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ตรวจสอบว่าเลือกคลินิกอย่างน้อย 1 คลินิก
    const hasEye = formData.doceye && formData.timeeye;
    const hasCheckup = formData.doccheckup && formData.timecheckup;
    const hasCardio = formData.doccardio && formData.timecardio;

    if (!hasEye && !hasCheckup && !hasCardio) {
      if (window.Swal) {
        window.Swal.fire({
          title: 'กรุณาเลือกคลินิก',
          text: 'คุณต้องเลือกการตรวจอย่างน้อย 1 คลินิก ถึงจะจองนัดหมายได้',
          icon: 'warning',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#002D56'
        });
      }
      return;
    }

    // แสดงหน้าสรุปข้อมูล
    setShowReview(true);
  };

  const handleConfirmBooking = () => {
    if (window.Swal) {
      window.Swal.fire({
        title: 'สำเร็จ!',
        text: 'บันทึกข้อมูลการนัดหมายสำเร็จแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#002D56',
        didOpen: () => {
          const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
          if (confirmButton) {
            confirmButton.style.backgroundColor = '#002D56';
          }
        }
      }).then(() => {
        // รีเซ็ตฟอร์ม
        setFormData({
          bookdate: '',
          date: '',
          doccardio: '',
          timecardio: '',
          doceye: '',
          timeeye: '',
          doccheckup: '',
          timecheckup: '',
          addoncheckup: [],
          addoncadio: [],
          addoninternal: []
        });
        setShowReview(false);
      });
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatThaiDate = (bookdate: string, date: string) => {
    if (!bookdate || !date) return '';
    
    const thaiDays = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    try {
      const dateObj = new Date(date);
      const dayIndex = dateObj.getDay();
      const day = dateObj.getDate();
      const monthIndex = dateObj.getMonth();
      const year = dateObj.getFullYear() + 543;

      return `${thaiDays[dayIndex]} ที่ ${day} ${thaiMonths[monthIndex]} ${year}`;
    } catch {
      return `${bookdate} ${date}`;
    }
  };

  if (showReview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#002D56] rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              สรุปข้อมูลการนัดหมาย
            </h2>
            <p className="text-gray-600 ml-15">กรุณาตรวจสอบข้อมูลของคุณก่อนยืนยัน</p>
          </div>

          {/* Review Details */}
          <div className="space-y-4">
            {/* วันที่ */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    วันที่นัดหมาย
                  </h3>
                  <p className="text-gray-700 text-lg font-semibold">
                    {formatThaiDate(formData.bookdate, formData.date)}
                  </p>
                </div>
              </div>
            </div>

            {/* ตรวจตา */}
            {formData.doceye && formData.timeeye && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-500">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-emerald-600" />
                  ตรวจตา
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">แพทย์</p>
                    <p className="text-gray-800 font-semibold">{formData.doceye}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">เวลา</p>
                    <p className="text-gray-800 font-semibold">{formData.timeeye}</p>
                  </div>
                </div>
              </div>
            )}

            {/* คลินิกตรวจสุขภาพ */}
            {formData.doccheckup && formData.timecheckup && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-purple-600" />
                  คลินิกตรวจสุขภาพ
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">แพทย์</p>
                    <p className="text-gray-800 font-semibold">{formData.doccheckup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">เวลา</p>
                    <p className="text-gray-800 font-semibold">{formData.timecheckup}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ตรวจหัวใจ */}
            {formData.doccardio && formData.timecardio && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  ตรวจหัวใจและหลอดเลือด
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">แพทย์</p>
                    <p className="text-gray-800 font-semibold">{formData.doccardio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">เวลา</p>
                    <p className="text-gray-800 font-semibold">{formData.timecardio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowReview(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-lg font-bold transition duration-300 shadow-lg flex items-center justify-center gap-2 text-lg cursor-pointer"
            >
              <Edit className="w-5 h-5" />
              แก้ไข
            </button>
            <button
              onClick={handleConfirmBooking}
              className="bg-linear-to-r from-[#002D56] to-indigo-600 hover:from-[#003d7a] hover:to-indigo-700 text-white py-4 rounded-lg font-bold transition duration-300 shadow-lg flex items-center justify-center gap-2 text-lg cursor-pointer"
            >
              <CheckCircle className="w-5 h-5" />
              ยืนยันการจอง
            </button>
          </div>

          {/* Warning */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              หากต้องการแก้ไขข้อมูล กรุณากดปุ่ม "แก้ไข" เพื่อกลับไปแก้ไขรายละเอียด
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                <option value="2025-12-10">10 ธันวาคม 2568</option>
                <option value="2025-12-11">11 ธันวาคม 2568</option>
                <option value="2025-12-12">12 ธันวาคม 2568</option>
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
            ตรวจสอบการจอง
          </button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              หากเลือกวันเวลานัดหมายแล้วข้อมูลไม่ขึ้น รบกวนเลือกวันใหม่อีกครั้ง เนื่องจากอาจคิวเต็ม
            </p>
          </div>
        </form>
      </div>

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
    </div>
  );
}