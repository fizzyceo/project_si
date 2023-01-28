import supabase from '@/utils/SupabaseCli';
import React from 'react';
import { useState } from 'react';

const ActeM = ({ acte, uid, valide }) => {
  const { numActe, type, lieu, date } = acte;
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
  // const [valide, SetValide] = useState(false);
  console.log(acte);
  const Validate = async () => {
    const dateM = new Date(date);
    const registre = await supabase
      .from('registre')
      .select('numRegistre')
      .eq('annee', dateM.getFullYear())
      .eq('type', 'naissance');
    console.log(registre);
    const updated = await supabase
      .from('ActeMarriage')
      .update({
        valide: 1,
        registre: registre.data[0].numRegistre,
        responsable: uid,
      })
      .eq('numActe', numActe);
    if (updated.error) {
      throw updated.error.message;
    }
  };

  return (
    <div
      className={`font-serif hovershadow transition-all    bg-[#d4f6d4] w-[750px] mx-auto rounded-full p-4 flex flex-row justify-between items-center`}
    >
      <a
        href={`/acteM/${numActe}`}
        className="flex items-center gap-5 justify-between"
      >
        <img src="/file.png" className="w-12 h-12" alt="" />
        <div className="flex flex-col gap-1">
          <p>Numero:{numActe}</p>
          <p>Lieu de Marriage : {lieu}</p>
        </div>
      </a>
    </div>
  );
};

export default ActeM;
