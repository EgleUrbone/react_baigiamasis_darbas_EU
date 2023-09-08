import NewShopForm from '../components/forms/NewShopForm';

export default function AddShopPage() {
  return (
    <div className='border border-slate-500 mt-[130px] px-6'>
      <h1 className='font-header text-2xl mb-4 mt-8
      '>Add a new shop</h1>
      <NewShopForm />
    </div>
  );
}
