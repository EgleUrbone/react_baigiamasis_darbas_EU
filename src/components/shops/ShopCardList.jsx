
import SingleShop from './SingleShop';

export default function ShopCardList(props) {
  return (
    <ul className='flex flex-col items-center'>
      {props.list.map((sObj) => (
        <SingleShop key={sObj.id} {...sObj} />
      ))}
    </ul>
  );
}
