import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import SlidingCards from '../components/SlidingCards';
import CommentsList from '../components/comments/CommentsList';

export default function SingleShopPage() {
  const [currentShop, setCurrentShop] = useState({});

  const { shopId } = useParams();

  async function getData(shopId) {
    try {
      const docRef = doc(db, 'shops', shopId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data());
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
    <li className='flex flex-col items-center max-w-[1400px] mb-7 ml-auto mr-auto w-[370px] cursor-pointer mt-[130px] md:w-[450px] lg:w-[500px] xl:w-[800px] xl:mt-[150px] 2xl:mt-[180px]'>
      <div className='2xl:flex 2xl:flex-row 2xl:w-[1400px] 2xl:gap-8 2xl:mb-10'>
        <img
          className='w-[370px] h-[450px] object-cover rounded-2xl mb-6 md:w-[450px] lg:w-[500px] xl:w-[800px] 2xl:w-[800px]'
          src={currentShop.image}
          alt='shop image'
        />
        <div className='2xl:w-[50%]'>
          <h2 className='py-1  mb-2 uppercase font-header text-3xl tracking-wider xl:text-4xl 2xl:pt-0'>
            {currentShop.shopname}
          </h2>
          <p className='bg-black px-2 py-1 text-white inline-block mb-2 xl:mb-4'>
            {currentShop.year}, {currentShop.town}
          </p>
          <p className='mb-3'>{currentShop.description}</p>
          <hr className='mb-7 2xl:mb-12' />
        </div>
      </div>
      <SlidingCards />
      <CommentsList shopId={shopId} />
    </li>
  );
}
