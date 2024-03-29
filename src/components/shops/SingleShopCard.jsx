import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function SingleShopCard(props) {
  const navigate = useNavigate();

  // console.log('props ===', props);

  async function singleShopInfo(shopId) {
    console.log('clicked on', shopId);
    try {
      const docRef = doc(db, 'shops', shopId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data());
        navigate(`/${shopId}`);
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    } catch (error) {
      console.log('error ===', error);
    }
  }


  return (
    <li
      className={
        auth.currentUser.uid === props.userUid
          ? 'flex flex-col items-center mb-7 relative w-[370px] cursor-pointer xl:w-[420px]  border-[3px] border-primary rounded-2xl p-2'
          : 'flex flex-col items-center mb-7 relative w-[370px] cursor-pointer xl:w-[420px] xl:h-[500px]'
      }
    >
      <img
        onClick={() => singleShopInfo(props.id)}
        className='w-[370px] h-[450px] object-cover rounded-2xl hover:opacity-50 ease-in-out duration-300 xl:w-[420px] xl:h-[500px]'
        src={props.image}
        alt='shop image'
      />
      <div className='absolute top-3/4 left-14'>
        <h2 className='bg-black px-2 py-1 text-white mb-2 uppercase lg:text-xl'>
          {props.shopname}
        </h2>
        <div className='flex justify-between'>
          <p className='bg-black px-2 py-1 text-white'>{props.year}</p>
        </div>
      </div>
    </li>
  );
}
