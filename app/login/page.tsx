'use client'

import Link from 'next/link';
import Image from 'next/image';
import { User, Briefcase, ChevronRight } from 'lucide-react';

export default function LoginSelection() {
  return (
    <div className="min-h-screen bg-[#002D56] relative overflow-hidden flex items-center justify-center p-6 font-sans">
      {/* องค์ประกอบตกแต่งพื้นหลัง (Background Orbs) */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* ส่วนหัวข้อ (Header Section) */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-white backdrop-blur-md rounded-2xl mb-4 border border-white/20 shadow-xl">
            <Image
              src="https://siph-space.sgp1.digitaloceanspaces.com/uploads/mcnair/2020/04/1587439316_%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5%E0%B8%A8%E0%B8%B4%E0%B8%A3%E0%B8%B4%E0%B8%A3%E0%B8%B2%E0%B8%8A_%E0%B8%9B%E0%B8%B4%E0%B8%A2%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%B8%E0%B8%93%E0%B8%A2%E0%B9%8C%28SiPH%29_800x600.png"
              alt="Logo"
              width={800}
              height={600}
              className="w-auto h-16"
            />
          </div>
          <h1 className="text-5xl md:text-4xl font-extrabold text-white tracking-tight">
            ระบบนัดหมายตรวจสุขภาพ SiPH<span className="text-blue-400">.</span>
          </h1>
          <p className="text-xl text-blue-100/80 font-light max-w-lg mx-auto">
            เข้าสู่ระบบเพื่อจัดการข้อมูลของคุณ <br className="hidden md:block" /> เลือกประเภทการใช้งานที่ต้องการด้านล่าง
          </p>
        </div>

        {/* ส่วนเลือกประเภท (Selection Cards) */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card: สำหรับผู้ใช้บริการ */}
          <Link
            href="/login/customer"
            className="cursor-pointer group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-10 text-left transition-all duration-500 hover:bg-white/15 hover:border-white/40 hover:-translate-y-2 shadow-2xl overflow-hidden w-full"
          >
            {/* ตกแต่งภายในการ์ด */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mb-8 shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                <User className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">ผู้มาใช้บริการ</h2>
              <p className="text-blue-100/70 text-lg leading-relaxed mb-8">
                สำหรับลูกค้าและผู้ใช้งานทั่วไป <br />
                เพื่อเข้าถึงบริการ ข้อมูลส่วนตัว และกิจกรรมต่างๆ
              </p>
              
              <div className="inline-flex items-center space-x-2 text-blue-300 font-bold group-hover:text-white transition-colors">
                <span className="text-sm tracking-widest uppercase">เข้าสู่ระบบตอนนี้</span>
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card: สำหรับพนักงาน */}
          <Link
            href="/login/nurse"
            className="cursor-pointer group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-10 text-left transition-all duration-500 hover:bg-white/15 hover:border-white/40 hover:-translate-y-2 shadow-2xl overflow-hidden w-full"
          >
            {/* ตกแต่งภายในการ์ด */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center w-20 h-20 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl mb-8 shadow-lg transform group-hover:-rotate-6 transition-transform duration-500">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">เจ้าหน้าที่</h2>
              <p className="text-blue-100/70 text-lg leading-relaxed mb-8">
                สำหรับเจ้าหน้าที่และผู้ดูแลระบบ <br />
                เพื่อจัดการระบบภายในและตรวจสอบรายงาน
              </p>
              
              <div className="inline-flex items-center space-x-2 text-emerald-300 font-bold group-hover:text-white transition-colors">
                <span className="text-sm tracking-widest uppercase">สำหรับเจ้าหน้าที่</span>
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

        </div>

        {/* Footer info */}
        <div className="mt-16 text-center">
          <p className="text-blue-100/40 text-sm tracking-wide">
            © 2024 Your Platform Name. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}