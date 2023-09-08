

export default function AddComment() {
  return (
    <div className='w-full mt-12'>
      <textarea className='border w-full p-2' name="comments" rows="4">Leave a comment</textarea>
      <button type='submit' className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white'>Post</button>
    </div>
  )
}
