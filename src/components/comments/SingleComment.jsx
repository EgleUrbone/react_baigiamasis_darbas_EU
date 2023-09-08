

export default function SingleComment(props) {
  return (
    <li>
      <h4>{props.author}</h4>
      <p>{props.text}</p>
    </li>
  )
}
