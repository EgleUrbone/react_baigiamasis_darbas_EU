export default function SingleShop(props) {
  return (
    <li className='flex flex-col items-center mb-7 relative'>
      <img
        className='w-[370px] h-[450px] object-cover rounded-2xl'
        src={props.image}
        alt='shop image'
      />
      <div className='absolute top-3/4 left-14'>
        <h2 className='bg-black px-2 py-1 text-white mb-2 uppercase'>{props.shopname}</h2>
        {/* <p>{props.description}</p>
      <p>{props.town}</p> */}
        <p className='bg-black px-2 py-1 text-white inline-block'>{props.year}</p>
      </div>
    </li>
  );
}
