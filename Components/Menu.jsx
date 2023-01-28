import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React from 'react';

const Menu = ({ nom, prenom }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const logout = async () => {
    let { error } = await supabaseClient.auth.signOut();
    if (error) {
      throw error.cause;
    } else {
      router.push('/');
    }
  };
  return (
    <div className="flex my-3 mx-auto font-serif text-white justify-between items-center menu w-[90%] rounded-full bg-black p-5">
      <h1 className="text-xl">
        Welcome <span className="text-green-400 font-semibold">{nom}</span>
      </h1>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Menu;
