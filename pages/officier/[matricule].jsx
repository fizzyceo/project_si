import DeleteOfficierModel from '@/Components/DeleteOfficierModel';
import Menu from '@/Components/Menu';
import supabase from '@/utils/SupabaseCli';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const PageOfficier = () => {
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [role, setRole] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateEntree, setDateEntree] = useState('');

  const { matricule } = router.query;
  const [deleteModel, setDeleteModel] = useState(false);
  const [spotchange, setSpotChange] = useState(false);
  useEffect(() => {
    if (matricule) {
      const getOfficierDetails = async () => {
        const { data, error } = await supabase
          .from('officier')
          .select('*')
          .eq('matricule', parseInt(matricule));
        if (error) {
          throw error.message;
        }
        console.log(data);
        if (data.length > 0) {
          setEmail(data[0]?.email);
          setPassword(data[0]?.password);
          setNom(data[0]?.nom);
          setPrenom(data[0]?.prenom);
          setRole(data[0]?.role);
          setDateEntree(data[0]?.date_entree);
        }
      };
      getOfficierDetails();
    }
  }, [matricule]);

  const savingchanges = async () => {
    console.log(matricule, dateEntree, email, password, nom, prenom);
    if (matricule && dateEntree && email && password && nom && prenom) {
      const { data, error } = await supabase
        .from('officier')
        .update({
          nom: nom,
          prenom: prenom,
          date_entree: dateEntree,
          email: email,
          password: password,
        })
        .eq('matricule', matricule);
      console.log('hbhbh');
      if (error) throw error.hint;
      console.log(data);
      setSpotChange(false);
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen overflow-hidden">
      <Menu nom={nom} />
      {/* <ShareModel
    onClose={() => setshowShareModel(false)}
    isvisible={showShareModel}
    Nom={user?.Prenom}


  /> */}
      <div className="flex flex-col max-w-md mx-auto gap-10 my-10">
        <h1 className="text-3xl text-center">Officier N{matricule}</h1>
        <button
          onClick={() => {
            setDeleteModel((model) => !model);
          }}
          className="bg-red-700 font-semibold text-white px-3 py-2 rounded-md"
        >
          Delete Officier
        </button>
        <div>
          <h1 className="text-xl my-5">Personal Infomations</h1>
          <div className="bg-white p-5 gap-2 rounded-md flex flex-col">
            <label htmlFor="NumActe">Nom</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setNom(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={nom}
            />
            <label htmlFor="NumActe">Prenom</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setPrenom(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={prenom}
            />

            <label htmlFor="NumActe">Date Entree</label>
            <input
              type="date"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setDateEntree(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={dateEntree}
            />
            <label htmlFor="NumActe">Email</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setEmail(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={email}
            />
            <label htmlFor="NumActe">Password</label>
            <input
              type="password"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setPassword(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={password}
            />
            <label htmlFor="NumActe">Role</label>
            <input
              type="text"
              name="NumActe"
              onChange={(e) => {
                setSpotChange(true);
                setRole(e.target.value);
              }}
              className="border-b-2 px-1 border-gray-400 hover:border-indigo-700 transition-all py-2"
              value={role}
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
        <div></div>
      </div>
      <DeleteOfficierModel
        onClose={() => setDeleteModel(false)}
        isvisible={deleteModel}
        matricule={matricule}
      />
    </div>
  );
};

export default PageOfficier;
