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
const Titulaire = ({ numb, uid }) => {
  const [showRegistreModel, setshowRegistreModel] = useState(false);
  const [showOfficierModel, setShowOfficierModel] = useState(false);
  const [registres, setRegistres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Officiers, setOfficiers] = useState([]);
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
        .eq('role', 'civile')
        .eq('numb', numb);
      if (error) {
        throw error.message;
      }
      setOfficiers(data);
      console.log(data);
    };

    setLoading(false);

    getRegistres();
    getOfficierCivile();
  }, []);

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

export default Titulaire;
