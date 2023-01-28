import Menu from '@/Components/Menu';
import Registre from '@/Components/Registre';
import DeleteBureauModel from '@/Components/DeleteBureauModel';
import supabase from '@/utils/SupabaseCli';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Bureau = () => {
  const router = useRouter();
  const { numb } = router.query;
  const [spotchange, setSpotChange] = useState(false);
  const [annee, setAnnee] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [daira, setDaira] = useState('');
  const [registres, setRegistres] = useState([]);
  const [commune, setCommune] = useState('');
  const [deleteModel, setDeleteModel] = useState('');

  useEffect(() => {
    if (numb) {
      const getInfos = async () => {
        const { data, error } = await supabase
          .from('bureau')
          .select('*')
          .eq('numb', numb);
        if (error) {
          throw error.message;
        }
        setAnnee(data[0]?.annee);
        setDaira(data[0]?.daira);
        setWilaya(data[0]?.wilaya);
        setCommune(data[0]?.numcommune);
      };
      const getRegistres = async () => {
        const { data, error } = await supabase
          .from('registre')
          .select('*')
          .eq('numb', numb);
        if (error) {
          throw error.message;
        }
        setRegistres(data);
      };
      getInfos();
      getRegistres();
    }
  }, [numb]);

  const savingchanges = async () => {
    console.log(numb, commune, wilaya, daira);
    if (numb && commune && wilaya && daira) {
      const { data, error } = await supabase
        .from('bureau')
        .update({
          numcommune: commune,
          wilaya: wilaya,
          daira: daira,
        })
        .eq('numb', numb);
      console.log('hbhbh');
      if (error) throw error.hint;
      console.log(data);
      setSpotChange(false);
    }
  };

  return (
    <div className="bg-slate-200 w-screen min-h-screen overflow-hidden">
      <Menu />
      {/* <ShareModel
onClose={() => setshowShareModel(false)}
isvisible={showShareModel}
Nom={user?.Prenom}


/> */}
      <div className="w-screen">
        <div className="flex flex-col max-w-md  mx-auto  gap-10 my-10">
          <h1 className="text-3xl text-center ">Bureau N{numb}</h1>
          <button
            onClick={() => {
              setDeleteModel((model) => !model);
            }}
            className="bg-red-700 font-semibold text-white px-3 py-2 rounded-md"
          >
            Delete Bureau
          </button>
          <div>
            <h1 className="text-xl my-5">Bureau Infomations</h1>
            <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
              <label htmlFor="NumActe">Wilaya</label>
              <input
                type="text"
                name="NumActe"
                onChange={(e) => {
                  setSpotChange(true);
                  setWilaya(e.target.value);
                }}
                className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
                value={wilaya}
              />
              <label htmlFor="NumActe">Daira</label>
              <input
                type="text"
                name="NumActe"
                onChange={(e) => {
                  setSpotChange(true);
                  setDaira(e.target.value);
                }}
                className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
                value={daira}
              />

              <label htmlFor="NumActe">Commune</label>
              <input
                type="text"
                name="NumActe"
                onChange={(e) => {
                  setSpotChange(true);
                  setCommune(e.target.value);
                }}
                className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
                value={commune}
              />
            </div>
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
        <div className="w-[90%] mx-auto">
          <h1 className="border-b-2  block text-center py-2 text-xl my-5 border-black">
            REGISTRES
          </h1>
          {registres ? (
            <div className="flex max-h-[650px] overflow-y-scroll py-5 flex-col gap-7">
              {registres.map((registre) => (
                <Registre key={registre.numRegistre} registre={registre} />
              ))}
            </div>
          ) : (
            <div className="font-semibold text-center">
              No registre found on this bureau...
            </div>
          )}
        </div>
      </div>
      <DeleteBureauModel
        onClose={() => setDeleteModel(false)}
        isvisible={deleteModel}
        numb={numb}
      />
    </div>
  );
};

export default Bureau;
