import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';

export default function SingleShopPage() {
  const [currentShop, setCurrentShop] = useState({});

  const { shopId } = useParams();

  async function getData(shopId) {
    try {
      const docRef = doc(db, 'shops', shopId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setCurrentShop(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    } catch (e) {
      console.log('Error getting cached document:', e);
    }
  }

  useState(() => {
    getData(shopId);
  }, []);


  return (
    <li className='flex items-center mb-7  w-[370px] cursor-pointer mt-[130px]'>
      <img
        className='w-[370px] h-[450px] object-cover rounded-2xl '
        src={currentShop.image}
        alt='shop image'
      />
      <div>
        <h2 className='bg-black px-2 py-1 text-white mb-2 uppercase'>
          {currentShop.shopname}
        </h2>
        {/* <p>{props.description}</p>
      <p>{props.town}</p> */}
        <p className='bg-black px-2 py-1 text-white inline-block'>
          {currentShop.year}
        </p>
        <p>{currentShop.description}</p>
        <p>{currentShop.town}</p>
      </div>
    </li>
  );
}
