'use client';

import React from 'react';

type LoaderDotsProps = {
  className?: string;
};

export default function LoaderDots({ className }: LoaderDotsProps) {
  return (
    <div className={className ?? ''}>
      <div className="w-full gap-x-2 flex justify-center items-center">
        <div className="w-5 bg-[#d991c2] h-5 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
