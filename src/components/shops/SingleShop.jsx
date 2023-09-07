

export default function SingleShop(props) {
  return (
    <li>
      <img src={props.image} alt="shop image" />
      <h2>{props.shopname}</h2>
      <p>{props.description}</p>
      <p>{props.town}</p>
      <p>{props.year}</p>
    </li>
  )
}
