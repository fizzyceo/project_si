// import { useRouter } from 'next/router';
// import React from 'react';

// const Dashboard = () => {
//   const router = useRouter();
//   const { uid } = router.query;
//   console.log(uid);
//   //liste des acte non valide(ou responsable='')
//   //if we click on validate button it will modify the acte table by adding responsable = Matricule
//   return <div>Dashboard</div>;
// };

// export default Dashboard;

import Civile from '@/Components/Civile';
import Maire from '@/Components/Maire';
import Menu from '@/Components/Menu';
import Titulaire from '@/Components/Titulaire';
import { Cookie } from '@next/font/google';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import supabase from '../utils/SupabaseCli';

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const [userId, setUserId] = useState('');
  const [nom, setNom] = useState('');
  const [Prenom, setPrenom] = useState('');
  const [role, setRole] = useState('');
  const [matricule, setMatricule] = useState(null);
  const [numb, setNumb] = useState(0);
  useEffect(() => {
    setLoading(true);
    const getuser = async () => {
      const user = await supabase.auth.getUser();
      if (user.data.user.id) {
        setUserId(user.data.user.id);
        console.log(user.data.user.id);
        const officier = await supabase
          .from('officier')
          .select('*')
          .eq('uid', user.data.user.id.toString());
        console.log(officier);
        setNom(officier.data[0].nom);
        setRole(officier.data[0].role);
        setNumb(officier.data[0].numb);
        setMatricule(officier.data[0].matricule);
        //retourne les registres de le bureau ou l'officier is from

        //setCommune(officier.data[0].numcommune);
        setLoading(false);
      } else {
        router.push('/');
      }
    };

    getuser();
  }, []);
  /*
-----------------welcome{Nom}--------LogOut----
check le role 
si role = civile ==> manipule les registres de son bureau 
   afficher les registres de type  Naissance/Marriage//Deces de chaque annee
   dans chaque registe afficher les actes dedans
   valide les actes 
si role = titulaire ===> cree un registre on specifient l'annee(dopt etre unique)
  liste des officiers 
  ajouter et supprimer des officiers de son bureau
si role = maire ==> maniple les bureauX de sa commune, modifier les roles des officiers 
ajoute un bureau
afficher les nom prenom matricule des officiers et leurs roles il peut modifier leur contenu
*/
  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center ">
        <div className="bg-green-600 w-7 rounded-full h-7 animate-bounce"></div>
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <>
            <Menu nom={nom} />

            {role === 'maire' && <Maire uid={matricule} />}
            {role === 'civile' && <Civile numb={numb} uid={matricule} />}
            {role === 'titulaire' && <Titulaire uid={matricule} />}

            {/**
          <div className="w-[475px]">
            <div className=" w-full flex flex-col gap-2 justify-center items-center">
              <a
                className="py-2  w-full rounded-md text-center text-slate-200 bg-[#000]"
                href="/DeclarerActeNaissance"
              >
                Declarer un Acte de Naissance
              </a>
              <a
                className="py-2  w-full rounded-md text-center text-slate-200 bg-[#000]"
                href="/DeclarerActeMarriage"
              >
                Declarer un Acte de Marriage
              </a>
              <a
                className="py-2  w-full rounded-md text-center text-slate-200 bg-[#000]"
                href="/DeclarerActeDeces"
              >
                Declarer un Acte de Deces
              </a>
            </div>
          </div>
 */}
          </>
        </main>
      </div>
    );
  }
};
export default Home;
