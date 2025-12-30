'use client';

import { useState } from 'react';
import { Edit, MapPin, Save, User, X } from 'lucide-react';
import Swal from 'sweetalert2';

type ProfileData = {
  fullname: string;
  phone: string;
  birthdate: string;
  gender: string;
  company: string;
  age: number;
  email: string;
  address: string;
  bloodtype: string;
};

export default function BookingProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
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

  const [editProfileData, setEditProfileData] = useState<ProfileData>(profileData);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditProfileData({
      ...editProfileData,
      [name]: name === 'age' ? Number(value) : value
    } as ProfileData);
  };

  const handleSaveProfile = async () => {
    setProfileData(editProfileData);
    setIsEditingProfile(false);
    
    await Swal.fire({
      title: 'สำเร็จ',
      text: 'บันทึกข้อมูลส่วนตัวสำเร็จแล้ว',
      icon: 'success',
      confirmButtonColor: '#002D56',
      confirmButtonText: 'ตกลง'
    });
  };

  return (
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
              const next = !isEditingProfile;
              setIsEditingProfile(next);
              if (next) setEditProfileData(profileData);
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
  );
}