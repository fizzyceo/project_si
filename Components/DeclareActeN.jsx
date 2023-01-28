import supabase from '@/utils/SupabaseCli';
import React, { useState } from 'react';

const DeclarerActeN = ({ isvisible, onClose, uid }) => {
  const [numA, setnumA] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numPere, setNumPere] = useState('');
  const [numMere, setNumMere] = useState('');
  const [sexe, setSexe] = useState('');
  const [dateN, setDateN] = useState(null);
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
    const date = new Date(dateN);
    const registre = await supabase
      .from('registre')
      .select('numRegistre')
      .eq('annee', date.getFullYear())
      .eq('type', 'naissance');
    if (registre.error) {
      setError(registre.error.message);
      setLoading(false);
      throw registre.error;
    }
    //get le registre d'abord
    console.log(registre);
    if (registre.data.length == 0) {
      setError('no registre with this year exists! create one first');
    } else {
      const { data, error } = await supabase.from('ActeNaissance').insert([
        {
          numActe: numA,
          nom: nom,
          prenom: prenom,
          pere: numPere,
          mere: numMere,
          dateNaissance: dateN,
          lieuNaissance: lieu,
          sexe: sexe,
          responsable: uid,
          registre: registre?.data[0]?.numRegistre,
        },
      ]);
      if (error) {
        setError('inter valid informations please');
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
            Declarer un Acte de Naissance
          </h1>
          {/**Numéro d’enregistrement, nom, prénom, sexe, date de naissance (heure et jour), le lieu 
de naissance,
numpere,
nummere */}
          <p>{error}</p>
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
              <label htmlFor="NumDeclarant">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Nom..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label htmlFor="NumDeclarant">Prenom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Prenom..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label htmlFor="NumDeclarant" className="w-15">
                Date de Naissance
              </label>
              <input
                type="date"
                value={dateN}
                onChange={(e) => setDateN(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Date de Naissance..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label className="w-15" htmlFor="NumDeclarant">
                Lieu de Naissance
              </label>
              <input
                type="text"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Lieu de Naissance..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label className="w-15" htmlFor="NumDeclarant">
                Sexe
              </label>
              <input
                type="text"
                value={sexe}
                onChange={(e) => setSexe(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Sexe..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label className="w-15" htmlFor="NumDeclarant">
                Num Pere
              </label>
              <input
                type="text"
                value={numPere}
                onChange={(e) => setNumPere(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num Pere..."
              />
            </div>
            <div className="flex items-center justify-between grow gap-3 w-full">
              <label className="w-15" htmlFor="NumDeclarant">
                Num Mere
              </label>
              <input
                type="text"
                value={numMere}
                onChange={(e) => setNumMere(e.target.value)}
                name="NumDeclarant"
                className="w-[80%] py-2 px-2 border-2 border-slate-400 rounded-md "
                placeholder="Num Mere..."
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

export default DeclarerActeN;
