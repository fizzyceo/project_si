import supabase from '@/utils/SupabaseCli';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Registre from './Registre';
import DeclarerActeN from '@/Components/DeclareActeN';
import DeclarerActeM from '@/Components/DeclareActeM';
import DeclarerActeD from '@/Components/DeclareActeD';
import AddRegistreModel from './AddRegistreModel';
import AddOfficierModel from './AddOfficierModel';
import Officier from './Officier';
import Bureau from './Bureau';
const Maire = ({ numb, uid }) => {
  const [showRegistreModel, setshowRegistreModel] = useState(false);
  const [showOfficierModel, setShowOfficierModel] = useState(false);
  const [registres, setRegistres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Officiers, setOfficiers] = useState([]);
  const [commune, setCommune] = useState('');
  const [bureaux, setBureaux] = useState([]);
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

    const getOfficierCivile = async () => {
      const { data, error } = await supabase
        .from('officier')
        .select('*')
        .neq('role', 'maire');

      if (error) {
        throw error.message;
      }
      setOfficiers(data);
      console.log(data);
      const getCommune = await supabase
        .from('bureau')
        .select('numcommune')
        .eq('numb', numb);
      if (getCommune.error) {
        throw getCommune.error.message;
      }
      setCommune(getCommune.data[0].numcommune);
    };
    console.log(commune);

    if (commune) {
      const getBureaux = async () => {
        const brx = await supabase
          .from('bureau')
          .select('*')
          .eq('numcommune', commune);
        if (brx.error) {
          throw brx.error.message;
        }
        setBureaux(brx.data);
      };
      getBureaux();
    }
    getRegistres();
    getOfficierCivile();

    setLoading(false);
  }, [commune]);

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
        <div className="flex max-h-[650px] overflow-y-scroll flex-col py-5 gap-7">
          {registres.map((registre) => (
            <Registre key={registre.numRegistre} registre={registre} />
          ))}
        </div>
      ) : (
        <div className="font-semibold text-center">
          No registre found on this bureau...
        </div>
      )}

      <h1 className="border-b-2  text-center py-2 text-xl my-5 border-black">
        OFFICIERS
      </h1>
      <button
        onClick={() => setShowOfficierModel((model) => !model)}
        className="bg-black mb-5 text-white rounded-full mx-auto w-full py-3"
      >
        Add a New Officer
      </button>
      {Officiers ? (
        <div className="flex max-h-[650px] py-5 overflow-y-scroll flex-col gap-7">
          {Officiers.map((of) => (
            <Officier key={of.matricule} of={of} />
          ))}
        </div>
      ) : (
        <div className="font-semibold text-center">
          No Officers found on this bureau...
        </div>
      )}
      <h1 className="border-b-2  text-center py-2 text-xl my-5 border-black">
        BUREAUX
      </h1>
      {bureaux ? (
        <div className="flex max-h-[650px] py-5 overflow-y-scroll flex-col gap-7">
          {bureaux.map((br) => (
            <Bureau key={br.numb} bureau={br} />
          ))}
        </div>
      ) : (
        <div className="font-semibold text-center">
          No Officers found on this bureau...
        </div>
      )}
      <AddRegistreModel
        onClose={() => setshowRegistreModel(false)}
        isvisible={showRegistreModel}
        uid={uid}
        numb={numb}
      />
      <AddOfficierModel
        onClose={() => setShowOfficierModel(false)}
        isvisible={showOfficierModel}
        uid={uid}
        numb={numb}
      />
    </div>
  );
};

export default Maire;
