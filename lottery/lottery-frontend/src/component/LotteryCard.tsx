function LotteryCard() {
    return (
      <div 
        className="bg-primary flex flex-col  rounded-[12px] p-[12px] gap-[12px]"
      >
        <div className="flex flex-row justify-between">
          <h3 className="h-[30px] text-[16px] text-secondary font-semibold">you won!</h3>
          <div className="bg-ligth-blue rounded-[8px] px-[12px] py-[4px]">Today</div>
        </div>

        <div className="flex flex-row justify-between text-text-white">
          <h3 className="text-[24px] font-bold">UroMillions</h3>
          <div className="bg-secondary px-[12px] py-[4px] rounded-[8px]">claim</div>
        </div>

        <div className="flex flex-row justify-between text-text-white font-semibold">
          <h3 className="">Number</h3>
          <div className="">83</div>
        </div>


        <div className="flex flex-row justify-between text-text-white font-semibold">
          <h3 className="">Your prize</h3>
          <div className="">225 SUI</div>
        </div>

        <div className="flex flex-row justify-between text-text-white font-semibold">
          <h3 className="">Pool prize</h3>
          <div className="">1000 SUI</div>
        </div>
      </div>
    )
  }
  
  export default LotteryCard