'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, FileText, LogOut, Menu } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface DoctorTimeSlots {
  [key: string]: string[];
}

export default function DoctorSlotPage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('checkup');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  
  // Tables data
  const [cardioTable, setCardioTable] = useState<string[]>([]);
  const [eyeTable, setEyeTable] = useState<string[]>([]);
  const [checkupTable, setCheckupTable] = useState<string[]>([]);

  // Doctor options by category
  const doctorOptions = {
    checkup: [
      'พญ. อัญชลี ตัณฑวิวัฒน์',
      'นพ. นภดล อัสสพงษ์สุนทร',
      'พญ. จริยา คุณมงคลวุฒิ',
      'พญ. แคทลียา บัณฑิต'
    ],
    eye: [
      'ช่วงเช้า (ไม่ระบุแพทย์)',
      'ช่วงบ่าย (ไม่ระบุแพทย์)'
    ],
    cardio: [
      'นพ. ปัญเกียรติ โตพิพัฒน์',
      'นพ. เอก เพ็ชรดาชัย',
      'นพ.นิทัศน์ วิศวชัยพันธ์',
      'นพ.อิศรา สันตอรรณพ',
      'พญ. มนต์สวรรค์',
      'นพ. ธนัญชัย ธนสัมฤทธิ์'
    ]
  };

  // Time slots for each doctor
  const doctorTimeSlots: DoctorTimeSlots = {
    'พญ. อัญชลี ตัณฑวิวัฒน์': ['09:00 - 09:15', '09:15 - 09:30'],
    'นพ. นภดล อัสสพงษ์สุนทร': ['12:30 - 12:45', '12:45 - 13:00'],
    'พญ. จริยา คุณมงคลวุฒิ': ['11:45 - 12:00'],
    'พญ. แคทลียา บัณฑิต': ['13:00 - 13:15'],
    'ช่วงเช้า (ไม่ระบุแพทย์)': ['08:00 - 12:00', '08:01 - 12:01', '08:02 - 12:02'],
    'ช่วงบ่าย (ไม่ระบุแพทย์)': ['13:00 - 16:00', '13:01 - 16:01'],
    'นพ. ปัญเกียรติ โตพิพัฒน์': ['11:40 - 12:00'],
    'นพ. เอก เพ็ชรดาชัย': ['07:30 - 07:45', '07:45 - 08:00', '08:00 - 08:15', '08:15 - 08:30'],
    'นพ.นิทัศน์ วิศวชัยพันธ์': ['11:00 - 11:20', '11:20 - 11:40', '11:40 - 12:00'],
    'นพ.อิศรา สันตอรรณพ': ['09:30 - 09:40', '09:40 - 09:50', '09:50 - 10:00'],
    'พญ. มนต์สวรรค์': ['10:00 - 10:15', '10:15 - 10:30'],
    'นพ. ธนัญชัย ธนสัมฤทธิ์': ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30', '11:30 - 12:00']
  };

  // Handle add to table
  const handleAddToTable = () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const formattedDate = formatThaiDate(selectedDate);
    const concatenatedValue = `${selectedDoctor} ${formattedDate} ${selectedTimeSlot}`;

    if (selectedCategory === 'cardio') {
      setCardioTable([...cardioTable, concatenatedValue]);
    } else if (selectedCategory === 'eye') {
      setEyeTable([...eyeTable, concatenatedValue]);
    } else if (selectedCategory === 'checkup') {
      setCheckupTable([...checkupTable, concatenatedValue]);
    }

    // Clear selections
    setSelectedDoctor('');
    setSelectedDate(undefined);
    setSelectedTimeSlot('');
  };

  // Format date to Thai format: "01 ธ.ค. 2025"
  const formatThaiDate = (date: Date | undefined) => {
    if (!date) return '';
    
    const thaiMonths = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  // Handle date selection and close popover
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
    if (selectedDate) {
      setOpenDatePicker(false);
    }
  };

  // Handle cut slot (submit)
  const handleCutSlot = () => {
    const maxRows = Math.max(cardioTable.length, eyeTable.length, checkupTable.length);
    
    if (maxRows === 0) {
      alert('กรุณาเพิ่มข้อมูลในตารางอย่างน้อย 1 รายการ');
      return;
    }

    // In real implementation, this would call an API
    alert('ตัด Slot สำเร็จ!');
    
    // Clear all tables
    setCardioTable([]);
    setEyeTable([]);
    setCheckupTable([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${showSidebar ? 'w-64' : 'w-0'} bg-[#002D56] text-white transition-all duration-300 overflow-hidden fixed h-full z-50`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">SiPH Nurse</h2>
            {/* <button
              onClick={() => setShowSidebar(false)}
              className="lg:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button> */}
          </div>
          
          <nav className="space-y-2">
            <Link href="/nurse/dashboard" className="flex items-center p-3 rounded-lg hover:bg-[#c99b0f] transition">
              <Calendar className="w-5 h-5 mr-3" />
              จัดการนัดหมาย
            </Link>
            <a href="/nurse/slot" className="flex items-center p-3 bg-[#002D56] rounded-lg hover:bg-[#c99b0f] transition">
              <FileText className="w-5 h-5 mr-3" />
              ตัด Slot แพทย์
            </a>
            <a href="/nurse/profile" className="flex items-center p-3 rounded-lg hover:bg-[#c99b0f] transition">
              <User className="w-5 h-5 mr-3" />
              ข้อมูลผู้ใช้
            </a>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-[#ffc107]">
          <Link href="/login/nurse" className="flex items-center p-3 rounded-lg hover:bg-red-600 transition">
            <LogOut className="w-5 h-5 mr-3" />
            ออกจากระบบ
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${showSidebar ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">ตัด Slot แพทย์</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">70009999 : แสนดี มีที่ไหน</span>
            </div>
          </div>
        </header>

        {/* Main Form */}
        <main className="p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-6xl mx-auto">
            {/* <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Slot แพทย์</h1> */}

            {/* Category Select */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">เลือกประเภท</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedDoctor('');
                  setSelectedDate(undefined);
                  setSelectedTimeSlot('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
              >
                <option value="checkup">Checkup</option>
                <option value="eye">Eye</option>
                <option value="cardio">Cardio</option>
              </select>
            </div>

            {/* Selection Section */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* Doctor Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">แพทย์</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value);
                    setSelectedTimeSlot('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700"
                >
                  <option value="">-- เลือกแพทย์ --</option>
                  {doctorOptions[selectedCategory as keyof typeof doctorOptions].map((doctor, index) => (
                    <option key={index} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่</label>
                <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                  <PopoverTrigger asChild>
                    <button className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 bg-white hover:bg-gray-50 transition text-left">
                      {selectedDate ? formatThaiDate(selectedDate) : 'เลือกวันที่'}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">เวลา</label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  disabled={!selectedDoctor}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002D56] focus:border-transparent outline-none text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">-- เลือกเวลา --</option>
                  {selectedDoctor && doctorTimeSlots[selectedDoctor] && doctorTimeSlots[selectedDoctor].map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={handleAddToTable}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-md cursor-pointer"
              >
                เพิ่มในตาราง
              </button>
              <button
                onClick={handleCutSlot}
                className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition shadow-md cursor-pointer"
              >
                ตัด Slot
              </button>
            </div>

            {/* Tables */}
            <div className="grid grid-cols-3 gap-4">
              {/* Cardio Table */}
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-linear-to-r from-red-50 to-pink-50 text-gray-800 p-3 text-center border border-pink-200">Cardio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardioTable.map((item, index) => (
                      <tr key={index}>
                        <td className="bg-white text-gray-700 p-3 text-center border border-pink-200 text-sm whitespace-pre-wrap wrap-break-word">
                          {item}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Eye Table */}
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-linear-to-r from-green-50 to-emerald-50 text-gray-800 p-3 text-center border border-green-200">Eye</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eyeTable.map((item, index) => (
                      <tr key={index}>
                        <td className="bg-white text-gray-700 p-3 text-center border border-green-200 text-sm whitespace-pre-wrap wrap-break-word">
                          {item}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Checkup Table */}
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-linear-to-r from-blue-50 to-indigo-50 text-gray-800 p-3 text-center border border-indigo-200">Checkup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkupTable.map((item, index) => (
                      <tr key={index}>
                        <td className="bg-white text-gray-700 p-3 text-center border border-indigo-200 text-sm whitespace-pre-wrap wrap-break-word">
                          {item}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
