export default function SingleShop(props) {
  return (
    <li className='flex flex-col items-center mb-7 relative w-[370px] cursor-pointer'>
      <img
        className='w-[370px] h-[450px] object-cover rounded-2xl hover:opacity-50 ease-in-out duration-300'
        src={props.image}
        alt='shop image'
      />
      <div className='absolute top-3/4 left-14'>
        <h2 className='bg-black px-2 py-1 text-white mb-2 uppercase'>
          {props.shopname}
        </h2>
        {/* <p>{props.description}</p>
      <p>{props.town}</p> */}
        <p className='bg-black px-2 py-1 text-white inline-block'>
          {props.year}
        </p>
      </div>
    </li>
  );
}
