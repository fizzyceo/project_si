import supabase from '@/utils/SupabaseCli';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ActeD from './ActeDeces';
import ActeM from './ActeMarriage';
import ActeN from './ActeNaissance';
import Registre from './Registre';
import DeclarerActeN from '@/Components/DeclareActeN';
import DeclarerActeM from '@/Components/DeclareActeM';
import DeclarerActeD from '@/Components/DeclareActeD';
import AddRegistreModel from './AddRegistreModel';

const Civile = ({ uid, numb }) => {
  const [registres, setRegistres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRegistreModel, setshowRegistreModel] = useState(false);
  const [showDeclareNModel, setshowDeclareNModel] = useState(false);
  const [showDeclareDModel, setshowDeclareDModel] = useState(false);
  const [showDeclareMModel, setshowDeclareMModel] = useState(false);
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

    setLoading(false);

    getRegistres();
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
        <button
          onClick={() => setshowRegistreModel((model) => !model)}
          className="bg-black mb-5 text-white rounded-full mx-auto w-full py-3"
        >
          Add New Registre
        </button>
        {registres ? (
          <div className="flex max-h-[650px] overflow-y-scroll flex-col gap-7">
            {registres.map((registre) => (
              <Registre key={registre.numRegistre} registre={registre} />
            ))}
          </div>
        ) : (
          <div className="font-semibold text-center">
            No registre found on this bureau...
          </div>
        )}
        <div className="my-5">
          <h1 className="border-b-2 text-center py-2 text-xl my-5 border-black">
            DECLARATION DES ACTES
          </h1>
          <h1 className="text-lg font-semibold underline">Acte Naissance:</h1>
          <div
            className="py-2 cursor-pointer w-full rounded-md text-center text-slate-200 bg-[#000]"
            onClick={() => setshowDeclareNModel((model) => !model)}
          >
            Declarer un Acte de Naissance
          </div>

          <h1 className="text-lg font-semibold underline">Acte de Marriage:</h1>
          <div
            className="py-2 cursor-pointer w-full rounded-md text-center text-slate-200 bg-[#000]"
            onClick={() => setshowDeclareMModel((model) => !model)}
          >
            Declarer un Acte de Marriage
          </div>
          {/* {ActeMarriageNonValide && (
            <div className="flex flex-col gap-7">
              {ActeMarriageNonValide.map((acte) => (
                <ActeM key={acte.numActe} acte={acte} uid={uid} />
              ))}
            </div>
          )} */}
          <h1 className="text-lg font-semibold underline">Acte de Deces:</h1>
          {/* {ActeDecesNonValide && (
            <div className="flex flex-col gap-7">
              {ActeDecesNonValide.map((acte) => (
                <ActeD key={acte.numActe} acte={acte} uid={uid} />
              ))}
            </div>
          )} */}
          <div className="w-full">
            <div className=" w-full flex flex-col gap-2 justify-center items-center">
              <div
                className="py-2 cursor-pointer w-full rounded-md text-center text-slate-200 bg-[#000]"
                onClick={() => setshowDeclareDModel((model) => !model)}
              >
                Declarer un Acte de Deces
              </div>
            </div>
          </div>
        </div>
        <DeclarerActeN
          onClose={() => setshowDeclareNModel(false)}
          isvisible={showDeclareNModel}
          uid={uid}
        />
        <DeclarerActeM
          onClose={() => setshowDeclareMModel(false)}
          isvisible={showDeclareMModel}
          uid={uid}
        />

        <DeclarerActeD
          onClose={() => setshowDeclareDModel(false)}
          isvisible={showDeclareDModel}
          uid={uid}
        />
        <AddRegistreModel
          onClose={() => setshowRegistreModel(false)}
          isvisible={showRegistreModel}
          uid={uid}
          numb={numb}
        />
      </div>
    );
  }
};
export default Civile;
