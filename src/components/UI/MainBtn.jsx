export default function MainBtn(props) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={
        props.mt
          ? 'mt-2 border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white'
          : 'border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white'
      }
    >
      {props.text}
    </button>
  );
}
