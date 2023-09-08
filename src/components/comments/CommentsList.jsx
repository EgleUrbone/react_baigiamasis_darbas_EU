import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';

export default function CommentsList(props) {
  const [commentsArr, setCommentsArr] = useState([]);

  async function getCommentsFromFB(shopId) {
    try {
      const querySnapshot = await getDocs(
        collection(db, 'shops', shopId, 'comments')
      );
      querySnapshot.forEach((doc) => {
        const commentsArr = [];
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        commentsArr.push({
          id: doc.id,
          ...doc.data(),
        });
        setCommentsArr(commentsArr);
      });
    } catch (error) {
      console.log('error ===', error);
    }
  }

  useEffect(() => {
    getCommentsFromFB(props.shopId);
  }, []);

  return (
    <ul>
      {commentsArr.map((cObj) => (
        <SingleComment key={cObj.id} {...cObj} />
      ))}
    </ul>
  );
}
