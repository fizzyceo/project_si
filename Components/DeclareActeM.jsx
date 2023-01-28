import supabase from '@/utils/SupabaseCli';
import React, { useState } from 'react';

const DeclarerActeM = ({ isvisible, onClose, uid }) => {
  const [numAH, setnumAH] = useState('');
  const [numAF, setnumAF] = useState('');
  const [numA, setnumA] = useState('');
  const [numTemoin1, setNumTemoin1] = useState('');
  const [numTemoin2, setNumTemoin2] = useState('');

  // const [nomH, setNomH] = useState('');
  // const [prenomH, setPrenomH] = useState('');
  // const [nomF, setNomF] = useState('');
  // const [prenomF, setPrenomF] = useState('');
  // const [numPereH, setNumPereH] = useState('');
  // const [numMereH, setNumMereH] = useState('');
  // const [numPereF, setNumPereF] = useState('');
  // const [numMereF, setNumMereF] = useState('');

  const [date, setDate] = useState('');
  const [lieu, setLieu] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleClose = (e) => {
    if (e.target?.id == 'wrapper') {
      onClose();
    }
  };

  {
    /**
remplir le formulaire + certificat + NSS du declarant  */
  }
  const InsertNewActe = async () => {
    setLoading(true);
    if (date) {
      const dateM = new Date(date);
      const registre = await supabase
        .from('registre')
        .select('numRegistre')
        .eq('annee', dateM.getFullYear())
        .eq('type', 'marriage');
      if (registre.error) {
        setError(registre.error.message);
        setLoading(false);
        throw registre.error;
      }
      //get le registre d'abord

      if (registre.data.length == 0) {
        setError('no registre with this year exists! create one first');
        setLoading(false);
        throw registre.status;
      } else {
        const temoin1 = await supabase
          .from('ActeNaissance')
          .select('numActe')
          .eq('numActe', numTemoin1);
        if (temoin1.error) {
          setError('temoin1 does not existe!');
          setLoading(false);
          throw temoin1.error.message;
        }
        setNumTemoin1(temoin1.data[0].numActe);
        const temoin2 = await supabase
          .from('ActeNaissance')
          .select('numActe')
          .eq('numActe', numTemoin1);
        if (temoin2.error) {
          setError('temoin1 does not existe!');
          setLoading(false);
          throw temoin1.error.message;
        }

        setNumTemoin2(temoin2.data[0].numActe);

        const { data, error } = await supabase.from('ActeMarriage').insert([
          {
            numActe: numA,
            numActeEpoux: numAH,
            numActeEpouse: numAF,
            type: 'marriage',
            date: date,
            lieu: lieu,

            responsable: uid,
            registre: registre?.data[0]?.numRegistre,
          },
        ]);
        if (error) {
          setError(error.message);
          setLoading(false);
          throw error.message;
        }
        if (data && temoin1 && temoin2) {
          console.log(temoin1, temoin2);
          const declared = await supabase.from('declarerMarriage').insert([
            {
              numActe: numA,
              temoin1: numTemoin1,
              temoin2: numTemoin2,
            },
          ]);
          if (declared.error) {
            setError('declaration error!');
            setLoading(false);
            throw declared.error.message;
          }
          if (error) {
            setError('inter valid informations please');
            setLoading(false);
            throw error.message;
          }
        }
      }
    }
    setLoading(false);
    onClose();
  };

  if (!isvisible) return null;
  return (
    <div
      onClick={(e) => handleClose(e)}
      id="wrapper"
      className="fixed flex inset-0 bg-black bg-opacity-25 max-h-[750px] backdrop-blur-sm justify-center items-center"
    >
      <div className="w-[750px] flex-col flex">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white flex flex-col gap-5 p-5 rounded-md">
          <h1 className="text-center font-semibold text-lg">
            Declarer un Acte de Naissance
          </h1>
          {/**Numéro d’enregistrement, nom, prénom, sexe, date de naissance (heure et jour), le lieu 
de naissance,
numpere,
nummere */}
          <p className="text-center text-red-700"> {error}</p>
          <div className="flex flex-col w-full justify-center items-center gap-3">
            <div className="flex items-center justify-between  gap-3 w-full">
              <label htmlFor="NumDeclarant">Numero Acte</label>
              <input
                type="text"
                value={numA}
                onChange={(e) => setnumA(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Num Acte Epoux</label>
              <input
                type="text"
                value={numAH}
                onChange={(e) => setnumAH(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Num Acte Epouse</label>
              <input
                type="text"
                value={numAF}
                onChange={(e) => setnumAF(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label htmlFor="NumDeclarant" className="w-15">
                Date de Marriage
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label className="w-15" htmlFor="NumDeclarant">
                Lieu de Marriage
              </label>
              <input
                type="text"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>

            <div className="flex items-center justify-between grow gap-3 w-full">
              <label className="w-15" htmlFor="NumDeclarant">
                num temoin 1
              </label>
              <input
                type="text"
                onChange={(e) => setNumTemoin1(e.target.value)}
                value={numTemoin1}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label className="w-15" htmlFor="NumDeclarant">
                num temoin 2
              </label>
              <input
                type="text"
                onChange={(e) => setNumTemoin2(e.target.value)}
                value={numTemoin2}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <button
              onClick={InsertNewActe}
              className="bg-green-700 w-full py-2 rounded-full text-white"
            >
              {loading ? (
                <div className="w-7 h-7 rounded-full animate-ping bg-white text-center"></div>
              ) : (
                <p>Submit</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarerActeM;
