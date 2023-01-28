import supabase from '@/utils/SupabaseCli';
import React from 'react';
import { useState } from 'react';

const DeleteBureauModel = ({ isvisible, onClose, numb }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const Delete = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bureau')
      .delete()
      .eq('numb', numb);
    if (error) {
      setError(error.message);
      throw error.message;
    }
    setLoading(false);
    onClose();
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
            Are you sure you want to delete this Bureau ?
          </h1>
          {/**Numéro d’enregistrement, nom, prénom, sexe, date de naissance (heure et jour), le lieu 
  de naissance,
  numpere,
  nummere */}
          <p>{error}</p>
          <div className="flex flex-row gap-5 items-center justify-center ">
            <button
              onClick={Delete}
              className="bg-red-700 w-full py-2 rounded-full text-white"
            >
              {loading ? (
                <div className="w-7 h-7 rounded-full animate-ping bg-white"></div>
              ) : (
                <p>Confirm</p>
              )}
            </button>
            <button
              onClick={() => onClose()}
              className="bg-slate-500 w-full py-2 rounded-full text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBureauModel;
