import Menu from '@/Components/Menu';
import supabase from '@/utils/SupabaseCli';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Acte = () => {
  const router = useRouter();
  const { numA } = router.query;

  const [naissance, setNaissance] = useState('');

  const [etatCivile, setEtatCivile] = useState('');
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [spotchange, setSpotChange] = useState(false);

  useEffect(() => {
    if (numA) {
      const getActeInfos = async () => {
        const ActeDeces = await supabase
          .from('ActeDeces')
          .select('*')

          .eq('numActe', numA);
        console.log(ActeDeces);
        setNaissance(ActeDeces.data[0]?.naissance);

        setDate(ActeDeces.data[0]?.date);
        setLieu(ActeDeces.data[0]?.lieu);
        setEtatCivile(ActeDeces.data[0]?.etatCivile);
      };
      getActeInfos();
    }
  }, [numA]);

  //add delete and modify buttons with confirmation popup
  //go and do the same for marriage and deces:declare,page,...
  //cree  registre
  //le titulaire liste les officiers ajouter et supprimer leur comptes
  //le maire liste les bureau de sa commune et ajoutes des bureaux
  //

  const savingchanges = async () => {
    if (etatCivile && date && lieu && numA) {
      console.log(etatCivile, lieu, date);

      const { data, error } = await supabase
        .from('ActeDeces')
        .update({
          date: new Date(date),
          lieu: lieu,
          type: 'deces',
          etatCivile: etatCivile,
        })
        .eq('numActe', numA);
      console.log('hbhbh');
      if (error) throw error.hint;
      console.log(data);
      setSpotChange(false);
    }
  };
  return (
    <div className="bg-slate-200 min-h-screen overflow-hidden">
      <Menu />
      {/* <ShareModel
        onClose={() => setshowShareModel(false)}
        isvisible={showShareModel}
        Nom={user?.Prenom}


      /> */}
      <div className="flex flex-col max-w-md mx-auto gap-10 my-10">
        <h1 className="text-3xl text-center">Acte de Deces N{numA}</h1>
        <div>
          <h1 className="text-xl my-5">Death Informations</h1>
          <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
            <label htmlFor="NumActe">Date de Deces</label>
            <input
              type="date"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setDate(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={date}
            />
            <label htmlFor="NumActe">Lieu de Deces</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setLieu(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={lieu}
            />

            <label htmlFor="NumActe">Etat Civile</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setEtatCivile(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={etatCivile}
            />
          </div>
          {spotchange && (
            <button
              className="w-full py-2 bg-indigo-800 text-white rounded-full my-2 "
              onClick={savingchanges}
            >
              Save Changes
            </button>
          )}
        </div>
        <div>
          <h1 className="text-xl my-5">Personal Informations</h1>
          <div className="flex flex-row gap-5 items-center justify-center">
            <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
              <a href={`/acteN/${naissance}`}>Acte de Naissance</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acte;
