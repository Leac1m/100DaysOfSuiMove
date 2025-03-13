interface LotteryCardProps {
  name: string;
  prize: number;
  date: string;
  time: string;
  onPlay?: () => void;
  isActive?: boolean;
  currency?: string;
}

function LotteryCard({ 
  name, 
  prize, 
  date, 
  time, 
  onPlay, 
  isActive = true,
  currency = 'SUI'
}: LotteryCardProps) {
  return (
    <div 
      className={`
        bg-primary flex flex-row justify-between 
        rounded-[12px] p-[12px] gap-[12px] 
        text-text-white font-semibold
        ${!isActive && 'opacity-50 cursor-not-allowed'}
      `}
    >
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[12px]">
          <div className="text-2xl">{name}</div>
          <div className="text-[16px]">
            {prize.toLocaleString()} {currency}
          </div>
        </div>

        <div className="flex flex-row gap-[20px]">
          <div className="bg-ligth-blue text-text-green rounded-[10px] px-[12px] py-[4px]">
            {date}
          </div>
          <div className="bg-ligth-blue text-text-green rounded-[10px] px-[12px] py-[4px]">
            {time}
          </div>
        </div>
      </div>

      <button 
        className={`
          bg-secondary px-4 h-8 py-1 rounded-[10px] 
          transition-all duration-200
          ${isActive 
            ? 'hover:bg-opacity-80 active:scale-95' 
            : 'cursor-not-allowed'
          }
        `}
        onClick={isActive ? onPlay : undefined}
        disabled={!isActive}
      >
        play
      </button>
    </div>
  )
}

export default LotteryCard