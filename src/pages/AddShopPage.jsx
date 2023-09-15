import NewShopForm from '../components/forms/NewShopForm';

export default function AddShopPage() {
  return (
    <section className='flex flex-col justify-center items-center h-calc'>
    <div className='mt-[130px] px-6 mb-7 max-w-[1000px] ml-auto mr-auto w-full lg:w-[70%] xl:w-[60%]'>
      <h1 className='font-header text-2xl mb-4 mt-8 tracking-wide
      '>Add a new shop</h1>
      <NewShopForm />
    </div>
    </section>
  );
}
