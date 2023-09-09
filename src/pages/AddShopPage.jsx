import NewShopForm from '../components/forms/NewShopForm';

export default function AddShopPage() {
  return (
    <div className='mt-[130px] px-6 mb-7'>
      <h1 className='font-header text-2xl mb-4 mt-8 tracking-wide
      '>Add a new shop</h1>
      <NewShopForm />
    </div>
  );
}
