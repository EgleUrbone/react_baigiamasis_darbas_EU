
import SingleShopCard from './SingleShopCard';

export default function ShopCardList(props) {
  return (
    <ul className='flex flex-col items-center lg:grid lg:grid-cols-2 lg:gap-x-14 lg:gap-y-6 lg:mb-6 2xl:grid-cols-3'>
      {props.list?.map((sObj) => (
        <SingleShopCard key={sObj.id} {...sObj} />
      ))}
    </ul>
  );
}
