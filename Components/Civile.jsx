import supabase from '@/utils/SupabaseCli';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ActeD from './ActeDeces';
import ActeM from './ActeMarriage';
import ActeN from './ActeNaissance';
import Registre from './Registre';

const Civile = ({ uid, numb }) => {
  const [numR, setNumR] = useState(0);
  const [anneeR, setAnneeR] = useState(0);
  const [typeR, setTypeR] = useState('');
  const [registres, setRegistres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ActeNaissanceNonValide, setActeNaissanceNonValide] = useState([]);
  const [ActeMarriageNonValide, setActeMarriageNonValide] = useState([]);
  const [ActeDecesNonValide, setActeDecesNonValide] = useState([]);
  useEffect(() => {
    console.log(numb);
    setLoading(true);
    const getRegistres = async () => {
      const registres = await supabase
        .from('registre')
        .select('*')
        .eq('numb', numb);
      setRegistres(registres.data);

      console.log(registres);
    };
    const getActeNonValide = async () => {
      const ActeNaissance = await supabase
        .from('ActeNaissance')
        .select('*')
        .eq('valide', 0);
      setActeNaissanceNonValide(ActeNaissance.data);

      console.log(ActeNaissance);
      const ActeMarriage = await supabase
        .from('ActeMarriage')
        .select('*')
        .eq('valide', 0);
      setActeMarriageNonValide(ActeMarriage.data);

      const ActeDeces = await supabase
        .from('ActeDeces')
        .select('*')
        .eq('valide', 0);
      setActeDecesNonValide(ActeDeces.data);

      console.log(ActeDeces);
    };
    setLoading(false);

    getRegistres();
    getActeNonValide();
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center ">
        <div className="bg-green-600 w-7 rounded-full h-7 animate-bounce"></div>
      </div>
    );
  } else {
    return (
      <div className="w-[90%] mx-auto">
        <h1 className="border-b-2  text-center py-2 text-xl my-5 border-black">
          REGISTRES
        </h1>

        {registres ? (
          <div className="flex flex-col gap-7">
            {registres.map((registre) => (
              <Registre registre={registre} />
            ))}
          </div>
        ) : (
          <div className="font-semibold text-center">
            No registre found on this bureau...
          </div>
        )}
        <div>
          <h1 className="border-b-2 text-center py-2 text-xl my-5 border-black">
            Acte Non Valide
          </h1>
          <h1 className="text-lg font-semibold underline">Acte Naissance:</h1>
          {ActeNaissanceNonValide && (
            <div className="flex flex-col gap-7">
              {ActeNaissanceNonValide.map((acte) => (
                <ActeN
                  key={acte.numActe}
                  valide={false}
                  acte={acte}
                  uid={uid}
                />
              ))}
            </div>
          )}
          <h1 className="text-lg font-semibold underline">Acte de Marriage:</h1>
          {ActeMarriageNonValide && (
            <div className="flex flex-col gap-7">
              {ActeMarriageNonValide.map((acte) => (
                <ActeM key={acte.numActe} acte={acte} uid={uid} />
              ))}
            </div>
          )}
          <h1 className="text-lg font-semibold underline">Acte de Deces:</h1>
          {ActeDecesNonValide && (
            <div className="flex flex-col gap-7">
              {ActeDecesNonValide.map((acte) => (
                <ActeD key={acte.numActe} acte={acte} uid={uid} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};
export default Civile;
