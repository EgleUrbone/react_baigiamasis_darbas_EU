import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import ShopCardList from '../components/shops/ShopCardList';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { TbCircleLetterA, TbCircleLetterZ } from 'react-icons/tb';

export default function ShopsPage() {
  const [shopsArr, setShopsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [sortedArr, setSortedArr] = useState([])

  // console.log('shopsArr ===', shopsArr);

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
      console.log('This will run after 1 second!');
      getAllShopsFB();
    }, 1000);
  }, []);

  function sortArrayByYear() {
    const sorted = [...shopsArr];
    sorted.sort((a, b) => {
      return a.year - b.year;
    });
    setSortedArr(sorted);
  }

  function sortArrayByName() {
    const sorted = [...shopsArr];
    sorted.sort((a, b) => {
      return a.shopname.localeCompare(b.shopname);
    });
    setSortedArr(sorted);
  }

  function sortArrayByNameFromEnd() {
    const sorted = [...shopsArr];
    sorted.sort((a, b) => {
      return b.shopname.localeCompare(a.shopname);
    });
    setSortedArr(sorted);
  }

  return (
    <div className='mt-[130px] lg:ml-auto lg:mr-auto'>
      <h1
        className='font-header text-2xl mb-4 mt-2 tracking-wide text-center lg:text-[30px] lg:mb-14 lg:mt-6 2xl:text-[36px]
      '
      >
        Check out our Shops
      </h1>
      <section>
        <button onClick={sortArrayByYear}>
          <IoCalendarNumberOutline />
        </button>
        <button onClick={sortArrayByName}>
          <TbCircleLetterA />
        </button>
        <button onClick={sortArrayByNameFromEnd}>
          <TbCircleLetterZ />
        </button>
      </section>
      {isLoading ? <p className='text-center mt-2 mb-2'>Loading...</p> : null}
      {shopsArr.length === 0 && (
        <p className='text-center mt-2'>There are no shops to view..</p>
      )}
      <ShopCardList list={sortedArr.length ? sortedArr : shopsArr} />
    </div>
  );
}
