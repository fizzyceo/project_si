import { Spectral_SC } from '@next/font/google';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Officier = ({ of }) => {
  const { matricule, date_entree, email, password, nom, prenom } = of;

  return (
    <a
      href={`/officier/${matricule}`}
      className="font-serif hovershadow transition-all cursor-pointer  bg-[#d4f6d4] w-[750px] mx-auto rounded-full p-4 flex flex-row justify-between items-center"
    >
      <div className="flex items-center gap-5 justify-between">
        <img src="/admin.png" alt="" />
        <div className="flex flex-col gap-1">
          <p>Nom : {nom}</p>
          <p>Prenom: {prenom}</p>
        </div>
      </div>
      <div>
        <p>Matricule: {matricule}</p>
        <p>date Entree: {date_entree}</p>
      </div>
    </a>
  );
};

export default Officier;
