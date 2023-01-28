import ActeD from '@/Components/ActeDeces';
import ActeM from '@/Components/ActeMarriage';
import ActeN from '@/Components/ActeNaissance';
import Menu from '@/Components/Menu';
import supabase from '@/utils/SupabaseCli';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Registre = () => {
  const router = useRouter();
  const { numR } = router.query;
  console.log(numR);
  const [ActeValide, setActeValide] = useState([]);
  const [typeR, setTypeR] = useState('');
  const numreg = parseInt(numR);
  useEffect(() => {
    if (numR) {
      const getActeValide = async () => {
        const typeRegistre = await supabase
          .from('registre')
          .select('type')
          .eq('numRegistre', numreg);

        if (typeRegistre.error) {
          throw typeRegistre.error.message;
        }
        let tableName = '';
        if (typeRegistre.data[0].type === 'naissance') {
          tableName = 'ActeNaissance';
        } else if (typeRegistre.data[0].type === 'marriage') {
          tableName = 'ActeMarriage';
        } else {
          tableName = 'ActeDeces';
        }
        setTypeR(typeRegistre.data[0].type);
        console.log(tableName, typeRegistre);
        const ActeValide = await supabase
          .from(tableName)
          .select('*')
          .eq('registre', numR);
        if (ActeValide.error) {
          throw ActeValide.error.message;
        }
        console.log(ActeValide);
        setActeValide(ActeValide?.data);
      };
      getActeValide();
    }
  }, [numR]);
  return (
    <div>
      <Menu />
      <h1 className="border-b-2 text-center py-2 text-xl my-5 border-black">
        Acte Valide
      </h1>

      {ActeValide && (
        <div className="flex flex-col gap-7">
          {ActeValide.map((ActeValide) => {
            if (typeR === 'naissance') {
              return <ActeN valide={true} acte={ActeValide} />;
            } else if (typeR === 'marriage') {
              return <ActeM valide={true} acte={ActeValide} />;
            } else {
              return <ActeD valide={true} acte={ActeValide} />;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Registre;
