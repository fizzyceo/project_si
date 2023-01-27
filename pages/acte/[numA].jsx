import { useRouter } from 'next/router';
import React from 'react';

const Acte = () => {
  const router = useRouter();
  const { numA } = router.query;

  useEffect(() => {
    const getActeInfos = async () => {
      const ActeNaissance = await supabase
        .from('ActeNaissance')
        .select('*')
        .eq('valide', 1)
        .eq('registre', numR);
      setActeValide(ActeNaissance.data);
    };
    getActeInfos();
  }, []);
  return <div>{numA}</div>;
};

export default Acte;
