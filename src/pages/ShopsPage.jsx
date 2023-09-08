import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import ShopCardList from '../components/shops/ShopCardList';

export default function ShopsPage() {
  const [shopsArr, setShopsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log('shopsArr ===', shopsArr);

  async function getAllShopsFB() {
    try {
      const querySnapshot = await getDocs(collection(db, 'shops'));
      const dataBack = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        const singleShop = {
          id: doc.id,
          ...doc.data(),
        };
        dataBack.push(singleShop);
        setShopsArr(dataBack);
        setIsLoading(false);
      });
    } catch (error) {
      console.log('error ===', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('This will run after 1 second!')
      getAllShopsFB();
    }, 1000);
    
  }, []);

  return (
    <div className='mt-[130px]'>
      {isLoading ? <p className='text-center mt-2'>Loading...</p> : null}
      {shopsArr.length === 0 && <p>There are no shops to view..</p>}
      <ShopCardList list={shopsArr} />
    </div>
  );
}
