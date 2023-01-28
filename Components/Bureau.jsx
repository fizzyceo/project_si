import { Spectral_SC } from '@next/font/google';
import React, { useEffect } from 'react';
import { useState } from 'react';

const bureau = ({ bureau }) => {
  const { daira, numb, wilaya, numcommune } = bureau;

  return (
    <a
      href={`/bureau/${numb}`}
      className="font-serif hovershadow transition-all cursor-pointer  bg-[#d4f6d4] w-[750px] mx-auto rounded-full p-4 flex flex-row justify-between items-center"
    >
      <div className="flex items-center gap-5 justify-between">
        <img src="./drawers.png" alt="" />
        <div className="flex flex-col gap-1">
          <p>Wilaya : {wilaya}</p>
          <p>Commune:{numcommune}</p>
        </div>
      </div>
      <p>Daira: {daira}</p>
    </a>
  );
};

export default bureau;
