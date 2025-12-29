'use client'

import React, { useState } from 'react';
import { Lock, Loader2, ChevronRight } from 'lucide-react';

export default function StaffLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const AZ_CONFIG = {
    CLIENT_ID: '9815c9a1-fd9b-40a2-856d-0f0ace524f95',
    TENANT_ID: 'a5f8f976-0c84-4a33-b713-b1139fde9b9f',
    SCOPE: 'openid profile email offline_access User.Read',
    REDIRECT_URI: typeof window !== 'undefined' ? `${window.location.origin}/index.html` : ''
  };

  const handleAzureLogin = () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      client_id: AZ_CONFIG.CLIENT_ID,
      response_type: 'code',
      redirect_uri: AZ_CONFIG.REDIRECT_URI,
      response_mode: 'query',
      scope: AZ_CONFIG.SCOPE,
      state: 'random_state_string_123',
      nonce: 'random_nonce_string_456'
    });

    const authUrl = `https://login.microsoftonline.com/${AZ_CONFIG.TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`;

    setTimeout(() => {
      window.location.href = authUrl;
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      {/* Background Decorative Elements - เพิ่มวงกลมแสงด้านหลังให้กล่องดูเด่น */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px]" />

      {/* Main Container */}
      <div className="max-w-md w-full relative group">
        
        {/* Animated Outer Glow - แสงฟุ้งรอบกล่อง */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        {/* Glassmorphism Card */}
        <div className="relative bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 text-center">
          
          {/* Logo Section */}
          <div className="mb-10 relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-6 transform transition-transform duration-500 group-hover:rotate-6">
              <svg width="40" height="40" viewBox="0 0 23 23" fill="none">
                <path d="M0 0H10.9V10.9H0V0Z" fill="#F25022"/>
                <path d="M12.1 0H23V10.9H12.1V0Z" fill="#7FBA00"/>
                <path d="M0 12.1H10.9V23H0V12.1Z" fill="#00A4EF"/>
                <path d="M12.1 12.1H23V23H12.1V12.1Z" fill="#FFB900"/>
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Staff Portal
            </h1>
            <div className="h-1 w-12 bg-blue-500 mx-auto rounded-full mb-4"></div>
            <p className="text-slate-400 text-sm leading-relaxed px-4">
              Access the secure enterprise network <br /> using your Microsoft account.
            </p>
          </div>

          {/* Action Button */}
          <div className="space-y-6">
            <button
              onClick={handleAzureLogin}
              disabled={isLoading}
              className={`
                relative w-full flex items-center justify-between group/btn py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider
                transition-all duration-300 active:scale-[0.98] overflow-hidden cursor-pointer
                ${isLoading 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-white text-slate-950 hover:bg-blue-50'}
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center w-full gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 23 23">
                      <path d="M0 0H10.9V10.9H0V0Z" fill="#F25022"/>
                      <path d="M12.1 0H23V10.9H12.1V0Z" fill="#7FBA00"/>
                      <path d="M0 12.1H10.9V23H0V12.1Z" fill="#00A4EF"/>
                      <path d="M12.1 12.1H23V23H12.1V12.1Z" fill="#FFB900"/>
                    </svg>
                    <span>Sign In With Microsoft</span>
                  </div>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-white/5 w-fit mx-auto">
              <Lock className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                Protected by Azure Identity
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex justify-between items-center opacity-40">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">System v2.4.0</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Status: Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}