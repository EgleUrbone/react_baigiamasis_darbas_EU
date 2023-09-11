import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import ShopCardList from '../components/shops/ShopCardList';

export default function ShopsPage() {
  const [shopsArr, setShopsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedArr, setSortedArr] = useState([]);

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

  function sortBySelect(event) {
    const option = event.target.value;
    console.log(`rikiuoja pagal ${option}`);
    let sortedByOption;
    if (option === 'year') {
      sortedByOption = [...shopsArr].sort(
        (aObj, bObj) => bObj.year - aObj.year
      );
    } else if (option === 'nameA') {
      sortedByOption = [...shopsArr].sort((aObj, bObj) =>
        aObj.shopname.localeCompare(bObj.shopname)
      );
    } else if (option === 'nameZ') {
      sortedByOption = [...shopsArr].sort((aObj, bObj) =>
        bObj.shopname.localeCompare(aObj.shopname)
      );
    }
    setSortedArr(sortedByOption);
  }

  return (
    <div className='mt-[130px] lg:ml-auto lg:mr-auto'>
      <h1
        className='font-header text-2xl mb-6 mt-4 tracking-wide text-center lg:text-[30px] lg:mb-14 lg:mt-6 2xl:text-[36px]
      '
      >
        Check out our Shops
      </h1>

      <section className='ml-auto mr-auto text-center lg:flex lg:justify-between lg:mb-2'>
        <p className='uppercase text-sm mb-2'>
          Showing all {shopsArr.length} results
        </p>
        <select onChange={sortBySelect} className='mb-6'>
          <option defaultValue={''} value=''>
            Sort by
          </option>
          <option value='year'>Sort by year</option>
          <option value='nameA'>Sort by shop name A-Z</option>
          <option value='nameZ'>Sort by shop name Z-A</option>
        </select>
      </section>

      {isLoading ? <p className='text-center mt-2 mb-2'>Loading...</p> : null}
      {shopsArr.length === 0 && (
        <p className='text-center mt-2'>There are no shops to view.. YET!</p>
      )}
      {/* <ShopCardList list={shopsArr} /> */}
      <ShopCardList list={sortedArr.length ? sortedArr : shopsArr} />
    </div>
  );
}
