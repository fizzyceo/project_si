import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect } from 'react';
import supabase from '../utils/SupabaseCli';
import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';
import DeclarerActeN from '@/Components/DeclareActeN';
import DeclarerActeM from '@/Components/DeclareActeM';
import DeclarerActeD from '@/Components/DeclareActeN';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [showDeclareNModel, setshowDeclareNModel] = useState(false);
  const [showDeclareDModel, setshowDeclareDModel] = useState(false);
  const [showDeclareMModel, setshowDeclareMModel] = useState(false);
  useEffect(() => {
    const getuser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error.hint;

      console.log(data);
      //router.push('/Dashboard');
    };
    getuser();
  }, []);
  const router = useRouter();

  const checkLogin2 = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) {
      setError(error.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    } else {
      console.log(data);
      if (data.session) {
        setUserId(data.user.id);
        router.push('/Dashboard');
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="  bg-slate-900 w-screen min-h-screen">
        <h1 className="text-white text-center py-6 text-3xl ">Login Page</h1>

        <section className="max-w-[475px] rounded-md mt-16 p-4  bg-slate-500  h-fit mx-auto flex justify-center  flex-col gap-5 items-center">
          <h1 className="text-white font-semibold text-xl">
            Insert Credentials
          </h1>
          <h2 className="text-red-400">{error} </h2>

          <div className="w-full">
            <h3 className="text-white my-1">Email:</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Your Email"
              className="rounded-md w-full py-2 px-2 outline-none focus:border-b-purple-900 focus:border-b-2"
            />
          </div>
          <div className="w-full">
            <h3 className="text-white my-1">Password:</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your password"
              className="rounded-md  px-2  w-full py-2 outline-none focus:border-b-purple-900 focus:border-b-2"
            />
          </div>
          <button
            onClick={checkLogin2}
            className="w-full py-2 my-3 bg-black text-white"
          >
            Login
          </button>
          <a className="text-white hover:underline" href="/SignUp">
            vous etes un officier sans compte ?{' '}
          </a>
          <div className="w-full">
            <div className=" w-full flex flex-col gap-2 justify-center items-center">
              <div
                className="py-2 cursor-pointer w-full rounded-md text-center text-slate-200 bg-[#000]"
                onClick={() => setshowDeclareNModel((model) => !model)}
              >
                Declarer un Acte de Naissance
              </div>
              <div
                className="py-2 cursor-pointer w-full rounded-md text-center text-slate-200 bg-[#000]"
                onClick={() => setshowDeclareMModel((model) => !model)}
              >
                Declarer un Acte de Marriage
              </div>
              <div
                className="py-2 cursor-pointer w-full rounded-md text-center text-slate-200 bg-[#000]"
                onClick={() => setshowDeclareDModel((model) => !model)}
              >
                Declarer un Acte de Deces
              </div>
            </div>
          </div>
        </section>
        <DeclarerActeN
          onClose={() => setshowDeclareNModel(false)}
          isvisible={showDeclareNModel}
        />
        <DeclarerActeM
          onClose={() => setshowDeclareMModel(false)}
          isvisible={showDeclareMModel}
        />

        <DeclarerActeD
          onClose={() => setshowDeclareDModel(false)}
          isvisible={showDeclareDModel}
        />
      </main>
    </>
  );
}

// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { useState } from 'react';
// import supabase from '../utils/SupabaseCli';

// const Login = () => {
//   const router = useRouter();
//   //get the email & password

//   //check with the supabase user table if the user exists
//   //if yes add a session and redirect to the home page or dashboard
//   const [email, setEmail] = useState<string>();
//   const [password, setPassword] = useState<string>();
//   const [error, setError] = useState<string>();
//   const checkEmail = async () => {
//     if (password && email) {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });
//       if (error) {
//         console.log(error.message);
//         setError(error.message);
//       } else {
//         router.push('/Dashboard');
//       }
//     }
//   };
//   const handleKeyPress = (e) => {
//     if (e.key == 'Enter') {
//       checkEmail();
//     }
//   };
//   return (
//     <div className="bg-black  min-h-screen">
//       <div className="p-5 ">
//         <label className="text-white  " htmlFor="email">
//           Your Email:{' '}
//         </label>
//         <input
//           type="text"
//           name="email"
//           className="text-black"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label className="text-white  " htmlFor="text-white password">
//           Your password:{' '}
//         </label>
//         <input
//           type="password"
//           name="password"
//           onChange={(e) => setPassword(e.target.value)}
//           onKeyPress={(e) => handleKeyPress(e)}
//         />
//         <button
//           className="text-white bg-violet-600 px-4 py-1 rounded-md"
//           onClick={checkEmail}
//         >
//           Login
//         </button>
//       </div>
//       {error && (
//         <Link className="text-white" href="/SignUp">
//           you don't have an account ?{' '}
//         </Link>
//       )}
//     </div>
//   );
// };

// export default Login;
/*
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const router = useRouter();
  useEffect(() => {
    // Only run query once user is logged in.
    if (user) router.push('/Dashboard');
  }, [user]);

  if (!user)
    return (
      <div className="w-screen h-screen gap-10 flex  flex-col items-center justify-center bg-slate-100">
        <h1 className=" text-center py-6 text-3xl  ">Login Page</h1>
        <div className="mx-auto w-[475px]">
          <Auth
            redirectTo="http://localhost:3000/Dashboard"
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabaseClient}
            socialLayout="horizontal"
          />
        </div>
        <div className=" w-[475px] flex flex-col gap-2 justify-center items-center">
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
    );
};

export default LoginPage;
*/
