

export default function SingleComment(props) {
  return (
    <li className="mt-2 xl:mt-0">
      <h4 className="text-lg font-semibold">{props.author}</h4>
      <p className="border-b-[1px] pb-2">{props.text}</p>
    </li>
  )
}
