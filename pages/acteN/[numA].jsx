import Menu from '@/Components/Menu';
import supabase from '@/utils/SupabaseCli';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Acte = () => {
  const router = useRouter();
  const { numA } = router.query;
  const [infos, setInfos] = useState([]);
  const [Nom, setNom] = useState('');
  const [Prenom, setPrenom] = useState('');
  const [NumActe, setNumActe] = useState('');
  const [sexe, setSexe] = useState('');
  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [pere, setPere] = useState('');
  const [mere, setMere] = useState('');
  const [type, setType] = useState('');
  const [spotchange, setSpotChange] = useState(false);

  useEffect(() => {
    if (numA) {
      const getActeInfos = async () => {
        const ActeNaissance = await supabase
          .from('ActeNaissance')
          .select('*')
          .eq('valide', 1)
          .eq('numActe', numA);
        console.log(ActeNaissance);
        setNom(ActeNaissance.data[0]?.nom);
        setPrenom(ActeNaissance.data[0]?.prenom);
        setSexe(ActeNaissance.data[0]?.sexe);
        setDate(ActeNaissance.data[0]?.dateNaissance);
        setLieu(ActeNaissance.data[0]?.lieuNaissance);
        setType(ActeNaissance.data[0]?.type);
        setPere(ActeNaissance.data[0]?.pere);
        setMere(ActeNaissance.data[0]?.mere);
      };
      getActeInfos();
      console.log(infos);
    }
  }, [numA]);

  //add delete and modify buttons with confirmation popup
  //go and do the same for marriage and deces:declare,page,...
  //cree  registre
  //le titulaire liste les officiers ajouter et supprimer leur comptes
  //le maire liste les bureau de sa commune et ajoutes des bureaux
  //

  const savingchanges = async () => {
    console.log(Prenom, Nom, NumActe, lieu, date);
    if (Nom && numA && Prenom && sexe && date && lieu) {
      console.log(Prenom, Nom, NumActe, lieu, date);
      const { data, error } = await supabase
        .from('ActeNaissance')
        .update({
          nom: Nom,
          prenom: Prenom,
          dateNaissance: new Date(date),
          lieuNaissance: lieu,
          type: 'naissance',
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
        <h1 className="text-3xl text-center">
          Acte de {type} N{numA}
        </h1>
        <div>
          <h1 className="text-xl my-5">Personal Information</h1>
          <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
            <label htmlFor="Nom">Nom</label>
            <input
              type="text"
              name="Nom"
              onChange={(e) => {
                setSpotChange(true);
                setNom(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={Nom}
            />

            <label htmlFor="Prenom">Prenom</label>
            <input
              type="text"
              name="Prenom"
              onChange={(e) => {
                setSpotChange(true);
                setPrenom(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={Prenom}
            />
            <label htmlFor="NumActe">Date de Naissance</label>
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
            <label htmlFor="NumActe">Lieu de Naissance</label>
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

            <label htmlFor="NumActe">Sexe</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setSexe(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={sexe}
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
          <h1 className="text-xl my-5">Parental Information</h1>
          <div className="flex flex-row gap-5 items-center justify-center">
            <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
              <a href={`/acteN/${pere}`}>Pere</a>
            </div>
            <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
              <a href={`/acteN/${mere}`}>Mere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acte;
