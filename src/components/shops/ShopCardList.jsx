
import SingleShopCard from './SingleShopCard';

export default function ShopCardList(props) {
  return (
    <ul className='flex flex-col items-center'>
      {props.list.map((sObj) => (
        <SingleShopCard key={sObj.id} {...sObj} />
      ))}
    </ul>
  );
}
