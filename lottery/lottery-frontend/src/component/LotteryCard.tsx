function LotteryCard() {
    return (
      <div 
        className="bg-primary flex flex-row justify-between rounded-[12px] p-[12px] gap-[12px] text-text-white font-semibold"
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[12px]">
            <div className="text-2xl">Lucky</div>
            <div className="text-[16px]">1000 SUI</div>
          </div>

          <div className="flex flex-row gap-[20px]">
            <div className="bg-ligth-blue text-text-green rounded-[10px] px-[12px] py-[4px]">Today</div>
            <div className="bg-ligth-blue text-text-green rounded-[10px] px-[12px] py-[4px]">6:00pm</div>
          </div>
        </div>
        <div className="bg-secondary px-4 h-8 py-1 rounded-[10px]">play</div>
      </div>
    )
  }
  
  export default LotteryCard