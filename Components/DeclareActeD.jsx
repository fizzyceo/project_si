import supabase from '@/utils/SupabaseCli';
import React, { useState } from 'react';

const DeclarerActeD = ({ isvisible, onClose, uid }) => {
  const [numA, setnumA] = useState('');
  const [numActeNaissance, setnumActeNaissance] = useState('');
  const [etatCivile, setEtatCivile] = useState('');
  const [dateD, setDateD] = useState(null);
  const [lieuD, setLieuD] = useState('');
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
    const date = new Date(dateD);
    const registre = await supabase
      .from('registre')
      .select('numRegistre')
      .eq('annee', date.getFullYear())
      .eq('type', 'deces');
    if (registre.error) {
      setError(registre.error.message);
      setLoading(false);
      throw registre.error;
    }
    //get le registre d'abord
    console.log(registre);
    if (registre.error) {
      setError(registre.error.message);
      setLoading(false);
      throw registre.error;
    }
    if (registre.data.length == 0) {
      setError('no registre with this year exists! create one first');
    } else {
      const { data, error } = await supabase.from('ActeDeces').insert([
        {
          numActe: numA,
          date: dateD,
          type: 'deces',
          naissance: numActeNaissance,
          lieu: lieuD,
          responsable: uid,
          registre: registre?.data[0]?.numRegistre,
          etatCivile: etatCivile,
        },
      ]);
      if (error) {
        setError('enter valid informations please!');
        setLoading(false);
        throw error.message;
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
            Declarer un Acte de Deces
          </h1>
          {/**Numéro d’enregistrement, nom, prénom, sexe, date de naissance (heure et jour), le lieu 
de naissance,
numpere,
nummere */}
          <p>{error}</p>
          <div className="flex flex-col w-full justify-center items-center gap-3">
            <div className="flex items-center justify-between  gap-3 w-full">
              <label htmlFor="NumDeclarant">N Acte Deces</label>
              <input
                type="text"
                value={numA}
                onChange={(e) => setnumA(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte Deces..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label htmlFor="NumDeclarant">N Acte Naissance</label>
              <input
                type="text"
                value={numActeNaissance}
                onChange={(e) => setnumActeNaissance(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="N Acte Naissance..."
              />
            </div>
            <div className="flex items-center justify-between  grow gap-3 w-full">
              <label htmlFor="NumDeclarant">date de deces</label>
              <input
                type="date"
                value={dateD}
                onChange={(e) => setDateD(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="date de deces..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label htmlFor="NumDeclarant">lieu de deces</label>
              <input
                type="text"
                value={lieuD}
                onChange={(e) => setLieuD(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="lieu de deces..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label htmlFor="NumDeclarant" className="w-15">
                etat Civile
              </label>
              <input
                type="text"
                value={etatCivile}
                onChange={(e) => setEtatCivile(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="etat Civile..."
              />
            </div>

            <button
              onClick={InsertNewActe}
              className="bg-green-700 w-full py-2 rounded-full text-white"
            >
              {loading ? (
                <div className="w-7 h-7 rounded-full animate-ping bg-white"></div>
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

export default DeclarerActeD;
