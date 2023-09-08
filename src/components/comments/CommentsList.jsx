import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import SingleComment from './SingleComment';
import AddCommentForm from './AddCommentForm';

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

  let currentShopId = props.shopId;
  // console.log('currentShopId ===', currentShopId);

  return (
    <div className='w-full'>
      <AddCommentForm shopId={currentShopId} />
      <ul className='w-full'>
        {commentsArr.map((cObj) => (
          <SingleComment key={cObj.id} {...cObj} />
        ))}
      </ul>
    </div>
  );
}
