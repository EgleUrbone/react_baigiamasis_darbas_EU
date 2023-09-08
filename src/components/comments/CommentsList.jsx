import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import SingleComment from './SingleComment';

export default function CommentsList(props) {
  const [commentsArr, setCommentsArr] = useState([]);

  async function getCommentsFromFB(shopId) {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'shops', shopId, 'comments')
      );
      const commentArr = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        commentArr.push({
          id: doc.id,
          ...doc.data(),
        });
        setCommentsArr(commentArr);
      });
    } catch (error) {
      console.log('error ===', error);
    }
  }

  useEffect(() => {
    getCommentsFromFB(props.shopId);
  }, []);

  console.log('commentsArr ===', commentsArr);

  return (
    <ul className='w-full'>
      {commentsArr.map((cObj) => (
        <SingleComment key={cObj.id} {...cObj} />
      ))}
    </ul>
  );
}
