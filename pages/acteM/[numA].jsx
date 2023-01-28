import Menu from '@/Components/Menu';
import supabase from '@/utils/SupabaseCli';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Acte = () => {
  const router = useRouter();
  const { numA } = router.query;

  const [pereH, setPereH] = useState('');
  const [mereH, setMereH] = useState('');

  const [pereF, setPereF] = useState('');
  const [mereF, setMereF] = useState('');

  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [numAH, setnumAH] = useState('');
  const [numAF, setnumAF] = useState('');

  const [numTemoin1, setNumTemoin1] = useState('');
  const [numTemoin2, setNumTemoin2] = useState('');
  const [spotchange, setSpotChange] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (numA) {
      const getActeInfos = async () => {
        const ActeMarriage = await supabase
          .from('ActeMarriage')
          .select('*')

          .eq('numActe', numA);

        if (ActeMarriage.error) {
          setLoading(false);
          throw ActeMarriage.error.message;
        }
        setnumAF(ActeMarriage.data[0]?.numActeEpouse);
        setnumAH(ActeMarriage.data[0]?.numActeEpoux);
        setDate(ActeMarriage.data[0]?.date);
        setLieu(ActeMarriage.data[0]?.lieu);
        if (ActeMarriage.data.length > 0) {
          const declaration = await supabase
            .from('declarerMarriage')
            .select('*')
            .eq('numActe', numA);
          if (declaration.error) {
            setLoading(false);
            throw declaration.error.message;
          }
          console.log(declaration.data);
          setNumTemoin1(declaration.data[0]?.temoin1);
          setNumTemoin2(declaration.data[0]?.temoin2);
          const ActeNaissanceEpoux = await supabase
            .from('ActeNaissance')
            .select('*')

            .eq('numActe', numAH);
          if (ActeNaissanceEpoux.error) {
            throw ActeNaissanceEpoux.error.message;
          }
          if (ActeNaissanceEpoux.data.length > 0) {
            setPereH(ActeNaissanceEpoux.data[0]?.pere);

            setMereH(ActeNaissanceEpoux.data[0]?.mere);
          }
          const ActeNaissanceEpouse = await supabase
            .from('ActeNaissance')
            .select('*')

            .eq('numActe', numAF);
          if (ActeNaissanceEpouse.error) {
            throw ActeNaissanceEpouse.error.message;
          }
          if (ActeNaissanceEpouse.data.length > 0) {
            setPereF(ActeNaissanceEpouse.data[0]?.pere);

            setMereF(ActeNaissanceEpouse.data[0]?.mere);
          }
          if (ActeMarriage.error) {
            setLoading(false);
            throw ActeMarriage.error.message;
          }
        }
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
    console.log(numA, lieu, date, numAF, numAH);
    const dateM = new Date(date);
    if (numAF && numA && numAH && date && lieu) {
      const { data, error } = await supabase
        .from('ActeNaissance')
        .update({
          numActe: parseInt(numA),
          numActeEpouse: parseInt(numAF),
          numActeEpoux: parseInt(numAH),
          date: dateM,
          lieu: lieu,
          type: 'marriage',
        })
        .eq('numActe', parseInt(numA));
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
        <h1 className="text-3xl text-center">Acte N{numA}</h1>
        <div>
          <h1 className="text-xl my-5">Wedding Details</h1>
          <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
            <label htmlFor="Nom">Date de Marriage</label>
            <input
              type="date"
              name="Nom"
              onChange={(e) => {
                setSpotChange(true);
                setDate(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={date}
            />

            <label htmlFor="Prenom">Lieu</label>
            <input
              type="text"
              name="Prenom"
              onChange={(e) => {
                setSpotChange(true);
                setLieu(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={lieu}
            />
            <label htmlFor="NumActe">num Acte d'Epoux</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setnumAH(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={numAH}
            />
            <label htmlFor="NumActe">num Acte d'Epouse</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setnumAF(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={numAF}
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
        <div className="font-serif p-5 ">
          <h1 className="text-xl font-semibold underline my-5">
            Personal Information
          </h1>
          <div className="flex items-center justify-center flex-col gap-5">
            <div className="flex flex-row gap-5 items-center justify-center">
              <h1>Epoux</h1>
              <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
                <a href={`/acteN/${numAH}`}>Informations</a>
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-5 items-center justify-center">
                <h1>Epouse</h1>
                <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
                  <a href={`/acteN/${numAF}`}>Informations</a>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-semibold underline my-5">
            Parental Information
          </h1>
          <div className="flex items-center justify-center flex-col gap-5">
            <div className="flex flex-row gap-5 items-center justify-center">
              <h1>Parents d'Epoux</h1>
              <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
                <a href={`/acteN/${pereH}`}>Pere</a>
              </div>
              <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
                <a href={`/acteN/${mereH}`}>Mere</a>
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-5 items-center justify-center">
                <h1>Parents d'Epouse</h1>
                <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
                  <a href={`/acteN/${pereF}`}>Pere</a>
                </div>
                <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
                  <a href={`/acteN/${mereF}`}>Mere</a>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-xl font-semibold underline my-5">
            Temoins Information
          </h1>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center flex-col gap-5">
              <div className="flex flex-row gap-5 items-center justify-center">
                <h1>Temoin1</h1>
                <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
                  <a href={`/acteN/${numTemoin1}`}>Informations</a>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col gap-5">
              <div className="flex flex-row gap-5 items-center justify-center">
                <h1>Temoin2</h1>
                <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
                  <a href={`/acteN/${numTemoin2}`}>Informations</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acte;
