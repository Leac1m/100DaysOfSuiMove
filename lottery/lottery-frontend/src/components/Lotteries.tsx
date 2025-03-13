import LotteryCard from "./assets/LotteryCard"


const Lotteries = () => {
  return (
    <div className="flex flex-col gap-2.5" >
        
      <LotteryCard
        name="Lucky"
        prize={1000}
        date="Today"
        time="6:00pm"
        onPlay={() => console.log("Lottery click!")}
      />

      <LotteryCard
        name="Weekly Draw"
        prize={5000}
        date="Tomorrow"
        time="12:00pm"
        // isActive={false}
      />

      <LotteryCard
        name="Special Draw"
        prize={100}
        date="Friday"
        time="3:00pm"
        currency="USDC"
      />
    </div> 
  )
}

export default Lotteries