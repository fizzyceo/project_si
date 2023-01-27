import supabase from '@/utils/SupabaseCli';
import React from 'react';
import { useState } from 'react';

const ActeN = ({ acte, uid, valide }) => {
  const { numActe, lieuNaissance, dateNaissance } = acte;
  // const [dateNaissance, setDateNaissance] = useState('');
  const [valideCSS, SetValideCSS] = useState(false);
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
    const dateN = new Date(dateNaissance);
    const registre = await supabase
      .from('registre')
      .select('numRegistre')
      .eq('annee', dateN.getFullYear())
      .eq('type', 'naissance');
    console.log(registre);
    const updated = await supabase
      .from('ActeNaissance')
      .update({
        valide: 1,
        registre: registre.data[0].numRegistre,
        responsable: uid,
      })
      .eq('numActe', numActe);

    if (updated.error) {
      throw updated.error.message;
    } else {
      SetValideCSS(true);
    }
  };

  return (
    <div
      className={`font-serif hovershadow transition-all ${
        valideCSS && 'valide'
      }   bg-[#d4f6d4] w-[750px] mx-auto rounded-full p-4 flex flex-row justify-between items-center`}
    >
      <a
        href={`/acte/${numActe}`}
        className="flex items-center gap-5 justify-between"
      >
        <img src="/file.png" className="w-12 h-12" alt="" />
        <div className="flex flex-col gap-1">
          <p>Numero:{numActe}</p>

          <p>Lieu de Naissance : {lieuNaissance}</p>
        </div>
      </a>

      {!valide && (
        <button
          onClick={Validate}
          className="bg-green-700 text-white px-5 py-2 z-20 relative left-5  rounded-md"
        >
          Valider
        </button>
      )}
    </div>
  );
};

export default ActeN;
