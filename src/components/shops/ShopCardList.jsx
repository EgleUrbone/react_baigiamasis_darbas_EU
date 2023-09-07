
import SingleShop from './SingleShop';

export default function ShopCardList(props) {
  return (
    <ul>
      {props.list.map((sObj) => (
        <SingleShop key={sObj.id} {...sObj} />
      ))}
    </ul>
  );
}
