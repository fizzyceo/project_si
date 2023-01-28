import supabase from '@/utils/SupabaseCli';
import React, { useState } from 'react';

const AddOfficierModel = ({ isvisible, numb, onClose }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [role, setRole] = useState('');
  const [matricule, setMatricule] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateEntree, setDateEntree] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const AddOfficer = async () => {
    const { data, error } = await supabase.from('officier').insert([
      {
        matricule: matricule,
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        role: role,
        date_entree: dateEntree,
        numb: numb,
      },
    ]);
    if (error) {
      setError(error.message);
      throw error.message;
    }
    console.log(data);
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
          <h1 className="text-center font-semibold text-lg">Add An Officer</h1>
          {/**Numéro d’enregistrement, nom, prénom, sexe, date de naissance (heure et jour), le lieu 
de naissance,
numpere,
nummere */}
          <p>{error}</p>
          <div className="flex flex-col w-full justify-center items-center gap-3">
            <div className="flex items-center justify-between  gap-3 w-full">
              <label htmlFor="NumDeclarant">Matricule</label>
              <input
                type="text"
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  gap-3 w-full">
              <label htmlFor="NumDeclarant">date Entree</label>
              <input
                type="date"
                value={dateEntree}
                onChange={(e) => setDateEntree(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Prenom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <div className="flex items-center justify-between  grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num d'acte..."
              />
            </div>
            <button
              onClick={AddOfficer}
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

export default AddOfficierModel;
