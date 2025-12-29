'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User as UserIcon, Stethoscope, Heart, Eye, CheckCircle, ChevronDown, ChevronUp, Activity, Syringe } from 'lucide-react';

export default function CustomerBooking() {
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

  const [showSections, setShowSections] = useState({
    checkup: false,
    cardio: false,
    vaccine: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const arrayName = name.replace('[]', '') as keyof typeof formData;
      const currentArray = formData[arrayName] as string[];
      
      if (checkbox.checked) {
        setFormData({
          ...formData,
          [arrayName]: [...currentArray, value]
        });
      } else {
        setFormData({
          ...formData,
          [arrayName]: currentArray.filter(item => item !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ส่งข้อมูลการจองนัดหมายสำเร็จ!\n' + JSON.stringify(formData, null, 2));
  };

  const toggleSection = (section: keyof typeof showSections) => {
    setShowSections({
      ...showSections,
      [section]: !showSections[section]
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/login/customer"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            กลับ
          </Link>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ระบบนัดหมายตรวจสุขภาพ</h1>
                <p className="text-gray-600">สำหรับผู้มาใช้บริการ</p>
              </div>
            </div>

            {/* ข้อมูลผู้นัดหมาย */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-gray-700">
              <h3 className="font-semibold text-gray-800 mb-3">ข้อมูลรายละเอียดผู้นัดหมาย</h3>
              <div className="grid grid-cols-2 gap-x-20 gap-y-3">
                <p className="text-sm"><strong>เบอร์มือถือ:</strong> 0631784331</p>
                <p className="text-sm"><strong>วันเดือนปีเกิด:</strong> 24/12/2540</p>
                <p className="text-sm"><strong>ชื่อ-นามสกุล:</strong> ทดสอบ ระบบ</p>
                <p className="text-sm"><strong>เพศ:</strong> ชาย</p>
                <p className="text-sm"><strong>บริษัท:</strong> PTT</p>
                <p className="text-sm"><strong>โปรแกรมตรวจสุขภาพ:</strong> อายุต่ำกว่า 35 ปี</p>
              </div>
            </div>
          </div>
        </div>

        {/* ฟอร์มจองนัดหมาย */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
            เลือกเวลาการนัดหมายตรวจสุขภาพ
          </h2>
          <p className="text-green-600 text-sm mb-6">ควรเลือกเวลานัดหมายห่างกัน 30 นาที</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* เลือกวันที่ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันที่ต้องการนัดหมาย
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="bookdate"
                  value={formData.bookdate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
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
            <div className="border-t pt-4">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                ตรวจตา
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="doceye"
                  value={formData.doceye}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
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
            </div>

            {/* คลินิกตรวจสุขภาพ */}
            <div className="border-t pt-4">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
                คลินิกตรวจสุขภาพ
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="doccheckup"
                  value={formData.doccheckup}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                  required
                  disabled={!formData.doccheckup}
                >
                  <option value="">เลือกเวลา</option>
                  <option value="10:00 - 10:30">10:00 - 10:30 น.</option>
                  <option value="10:30 - 11:00">10:30 - 11:00 น.</option>
                  <option value="11:00 - 11:30">11:00 - 11:30 น.</option>
                </select>
              </div>
            </div>

            {/* รายการตรวจเพิ่มเติม */}
            {/* <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">
                รายการตรวจเพิ่มเติมนอกเหนือจากโปรแกรม <span className="text-red-600">(ชำระเงินเอง)</span>
              </p>

              {/* ตรวจสุขภาพทั่วไป */}
              {/* <div className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('checkup')}
                  className="w-full bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-lg px-4 py-3 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="flex items-center font-semibold text-gray-800">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    ตรวจสุขภาพทั่วไป
                  </span>
                  {showSections.checkup ? 
                    <ChevronUp className="w-5 h-5 text-blue-600" /> : 
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  }
                </button>
                {showSections.checkup && (
                  <div className="mt-3 ml-2 p-4 bg-white border-l-4 border-blue-400 rounded-r-lg space-y-2 text-gray-700 animate-in slide-in-from-top-2 duration-200">
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoncheckup[]"
                        value="Stool Exam"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Stool Exam
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoncheckup[]"
                        value="ตรวจฮอร์โมนไทรอยด์ TSH"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      ตรวจฮอร์โมนไทรอยด์ TSH
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoncheckup[]"
                        value="ตรวจค่าน้ำตาลสะสม"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      ตรวจค่าน้ำตาลสะสม (HbA1C)
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoncheckup[]"
                        value="ตรวจวิตามิน D"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      ตรวจวิตามิน D ในเลือด
                    </label>
                  </div>
                )}
              </div> */}

              {/* ตรวจศูนย์หัวใจ */}
              {/* <div className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('cardio')}
                  className="w-full bg-linear-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border border-red-200 rounded-lg px-4 py-3 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="flex items-center font-semibold text-gray-800">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    ตรวจศูนย์หัวใจ
                  </span>
                  {showSections.cardio ? 
                    <ChevronUp className="w-5 h-5 text-red-500" /> : 
                    <ChevronDown className="w-5 h-5 text-red-500" />
                  }
                </button>
                {showSections.cardio && (
                  <div className="mt-3 ml-2 p-4 bg-white border-l-4 border-red-400 rounded-r-lg space-y-2 text-gray-700 animate-in slide-in-from-top-2 duration-200">
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoncadio[]"
                        value="ตรวจสมรรถภาพหัวใจขณะออกกำลังกาย"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      ตรวจสมรรถภาพหัวใจขณะออกกำลังกาย
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoncadio[]"
                        value="ตรวจสมรรถภาพหัวใจ Echo"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      ตรวจสมรรถภาพหัวใจ Echo
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoncadio[]"
                        value="ตรวจความยืดหยุ่นของหลอดเลือด ABI"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      ตรวจความยืดหยุ่นของหลอดเลือด ABI
                    </label>
                  </div>
                )}
              </div> */}

              {/* วัคซีน */}
              {/* <div className="mb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('vaccine')}
                  className="w-full bg-linear-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-lg px-4 py-3 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span className="flex items-center font-semibold text-gray-800">
                    <Syringe className="w-5 h-5 mr-2 text-green-600" />
                    วัคซีน
                  </span>
                  {showSections.vaccine ? 
                    <ChevronUp className="w-5 h-5 text-green-600" /> : 
                    <ChevronDown className="w-5 h-5 text-green-600" />
                  }
                </button>
                {showSections.vaccine && (
                  <div className="mt-3 ml-2 p-4 bg-white border-l-4 border-green-400 rounded-r-lg space-y-2 text-gray-700 animate-in slide-in-from-top-2 duration-200">
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoninternal[]"
                        value="วัคซีนไข้หวัดใหญ่"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      วัคซีนไข้หวัดใหญ่
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoninternal[]"
                        value="วัคซีนโควิด"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      วัคซีนโควิด
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        name="addoninternal[]"
                        value="วัคซีนไข้เลือดออก"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      วัคซีนไข้เลือดออก
                    </label>
                  </div>
                )}
              </div>
            </div> */}

            {/* ปุ่มจองนัดหมาย */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              จองนัดหมาย
            </button>

            <p className="text-sm text-gray-600 text-center">
              หากเลือกวันเวลานัดหมายแล้วข้อมูลไม่ขึ้น รบกวนเลือกวันใหม่อีกครั้ง เนื่องจากอาจคิวเต็ม
            </p>
          </form>
        </div>

        {/* ข้อมูลติดต่อ */}
        <div className="mt-6 bg-white rounded-lg shadow p-6 text-sm text-gray-700">
          <p className="font-semibold mb-2">หากมีข้อสงสัย ติดต่อ</p>
          <p>📍 ฝ่ายการตลาด โรงพยาบาลศิริราช ปิยมหาราชการุณย์</p>
          <p>📞 Phone: 02-419-1983 / 02-414-3630 (จันทร์-ศุกร์ 08:00 – 17:00 น.)</p>
          <p>✉️ Email: pornparn.p@siphhospital.com / warunyupa.p@siphhospital.com</p>
        </div>
      </div>
    </div>
  );
}
