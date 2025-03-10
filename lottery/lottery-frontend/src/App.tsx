import LotteryCard from './component/LotteryCard'
import TicketNFT from './component/TicketNFT'

function App() {
  return (
    <div className="min-h-screen flex flex-col max-w-[360px] max-h-[640px] mx-auto relative">
      
      {/* <button 
        className="absolute top-4 right-4 p-[20px] rounded-md text-white"
        style={{ backgroundColor: '#F8793E' }}
      >
        Button
      </button> */}
      
      <main className="flex flex-col p-4 gap-2.5">
        <LotteryCard />
        <TicketNFT />
      </main> 
      
      {/* <footer className="bg-white p-4 text-center text-sm text-gray-600">
        © 2023 Lottery App
      </footer> */}
    </div>
  )
}

export default App