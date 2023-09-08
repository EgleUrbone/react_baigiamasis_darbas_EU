

export default function SlidingCards() {
  return (
    <div className='w-[428px] overflow-y-hidden overflow-x-scroll flex gap-5 pl-4 no-scrollbar'>
      <img className="object-cover w-[400px] h-[400px] rounded-2xl"
        src='/img/birds/selective-focus-shot-small-canary-sitting-branch-berry-tree (1).jpg'
        alt='first bird'
      />
      <img className="object-cover w-[400px] h-[400px] rounded-2xl"
        src='/img/birds/closeup-whinchat-lupine-field-sunlight-with-blurry-background.jpg'
        alt='second bird'
      />
      <img className="object-cover w-[400px] h-[400px] rounded-2xl"
        src='/img/birds/selective-focus-shot-european-greenfinch-bird-green-surface-during-daylight.jpg'
        alt='third bird'
      />
      <img className="object-cover w-[400px] h-[400px] rounded-2xl" src='/img/birds/calm-bird-branch.jpg' alt='fourth bird' />
    </div>
  );
}
