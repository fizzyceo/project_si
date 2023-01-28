import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import supabase from '../utils/SupabaseCli';

const SignUp = () => {
  const router = useRouter();
  //get the email & password
  //check with the supabase user table if the user exists
  //if yes add a session and redirect to the home page or dashboard

  const [issent, setissent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const AddUser = async () => {
    if (password && email) {
      const IS_OFFICIER = await supabase
        .from('officier')
        .select('*')
        .eq('email', email)
        .eq('password', password);
      //on verifier que l'officier existe d'abord dans la base de donnes

      // on cree un compte dans ce systeme pour lui si il n'a pas un deja
      if (IS_OFFICIER.data.length > 0) {
        console.log('is in');
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error.message;
        console.log(data);
        if (data) {
          //updating le contenu de l'officier on lui attribuant le ID de cette utilisateur
          const updatinguid = await supabase
            .from('officier')
            .update({ uid: data.user.id })
            .eq('email', email)
            .eq('password', password);
          if (!updatinguid.error) {
            setissent(true);
          }
        }
      } else {
        setError('Wrong credentials!');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    }
  };

  return (
    <div>
      {!issent ? (
        <main className="  bg-slate-900 w-screen min-h-screen">
          <h1 className="text-white text-center py-6 text-3xl ">
            Sign Up Page
          </h1>

          <section className="max-w-[475px] rounded-md mt-16 p-4  bg-slate-700  max-h-[450px] mx-auto flex justify-center  flex-col gap-5 items-center h-screen">
            <h1 className="text-white font-semibold text-xl">
              Insert Credentials
            </h1>
            <p>{error}</p>
            <div className="w-full">
              <h3 className="text-white my-1">Email:</h3>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Your Email"
                className="rounded-md w-full py-2 outline-none focus:border-b-purple-900 focus:border-b-2"
              />
            </div>
            <div className="w-full">
              <h3 className="text-white my-1">Password:</h3>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your password"
                className="rounded-md  w-full py-2 outline-none focus:border-b-purple-900 focus:border-b-2"
              />
            </div>
            <button
              onClick={AddUser}
              className="w-full py-2 my-3 bg-purple-900 text-white"
            >
              Sign Up
            </button>
          </section>
        </main>
      ) : (
        <div className="w-screen flex items-center bg-slate-900 text-xl text-white justify-center h-screen">
          We sent you a confirmation Email! on {email} !
        </div>
      )}
    </div>
  );
};

export default SignUp;
