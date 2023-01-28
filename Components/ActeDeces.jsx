import supabase from '@/utils/SupabaseCli';
import React from 'react';
import { useState } from 'react';

const ActeD = ({ acte, valide }) => {
  const { numActe, lieu } = acte;
  // const [dateNaissance, setDateNaissance] = useState('');
  // const [valide, SetValide] = useState(false);
  //ACTE VALIDE /NON VALIDE
  //NAISSANCE / MARRIAGE / DECES
  // const [lieuNaissance, setLieuNaissance]=useState('')
  // const [sexe, setSexe]=useState('')
  // const [lieuNaissance, setLieuNaissance]=useState('')
  // if (type === 'marriage') {
  // } else if (type === 'naissance') {
  // } else {
  // }
  console.log(acte);
  const Validate = async () => {
    const updated = supabase
      .from('ActeNaissance')
      .update({ valide: 1 })
      .eq('numActe', numActe);

    if (updated.error) {
      throw updated.error.message;
    } else {
      SetValide(true);
    }
  };

  return (
    <div className="font-serif hovershadow transition-all   bg-[#d4f6d4] w-[750px] mx-auto rounded-full p-4 flex flex-row justify-between items-center">
      <a
        href={`/acteD/${numActe}`}
        className="flex items-center gap-5 justify-between"
      >
        <img src="/file.png" className="w-12 h-12" alt="" />
        <div className="flex flex-col gap-1">
          <p>Numero:{numActe}</p>
          <p>Lieu de Deces: {lieu}</p>
        </div>
      </a>
    </div>
  );
};

export default ActeD;
