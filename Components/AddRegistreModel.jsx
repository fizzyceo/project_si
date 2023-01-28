import supabase from '@/utils/SupabaseCli';
import React, { useState } from 'react';

const AddRegistreModel = ({ isvisible, numb, onClose }) => {
  const [newnumR, setNewNumR] = useState('');
  const [newAnneeR, setNewAnneeR] = useState('');
  const [newTypeR, setNewTypeR] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const AddRegistre = async () => {
    const { data, error } = await supabase.from('registre').insert([
      {
        numRegistre: newnumR,
        annee: newAnneeR,
        numb: numb,
        type: newTypeR,
      },
    ]);
    if (error) {
      setError(error.message);
      throw error.message;
    }
    onClose();
    setLoading(false);
  };
  const handleClose = (e) => {
    if (e.target?.id == 'wrapper') {
      onClose();
    }
  };

  if (!isvisible) return null;
  return (
    <div
      onClick={(e) => handleClose(e)}
      id="wrapper"
      className="fixed flex inset-0 bg-black bg-opacity-25  backdrop-blur-sm justify-center items-center"
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
              <label htmlFor="NumDeclarant">Numero Registre</label>
              <input
                type="text"
                value={newnumR}
                onChange={(e) => setNewNumR(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label htmlFor="NumDeclarant">Annee</label>
              <input
                type="text"
                value={newAnneeR}
                onChange={(e) => setNewAnneeR(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Type</label>
              <input
                type="text"
                value={newTypeR}
                onChange={(e) => setNewTypeR(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>

            <button
              onClick={AddRegistre}
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

export default AddRegistreModel;
