import { Spectral_SC } from '@next/font/google';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Registre = ({ registre }) => {
  const { type, numRegistre, annee } = registre;
  const [src, setSrc] = useState('');
  useEffect(() => {
    if (type === 'marriage') {
      setSrc('/pink.png');
    } else if (type === 'deces') {
      setSrc('/deces.png');
    } else {
      setSrc('/green.png');
    }
  }, []);
  return (
    <a
      href={`/registre/${numRegistre}`}
      className="font-serif hovershadow transition-all cursor-pointer  bg-[#d4f6d4] w-[750px] mx-auto rounded-full p-4 flex flex-row justify-between items-center"
    >
      <div className="flex items-center gap-5 justify-between">
        <img src={src} alt="" />
        <div className="flex flex-col gap-1">
          <p>Numero:{numRegistre}</p>
          <p>Type : {type}</p>
        </div>
      </div>
      <p>Annee: {annee}</p>
    </a>
  );
};

export default Registre;
