interface TicketNFTProps {
  status: 'won' | 'pending' | 'lost';
  lotteryName: string;
  ticketNumber: string | number;
  userPrize?: string | number;
  poolPrize: string | number;
  date: string [];
  onClaim?: () => void;
}

function TicketNFT({ 
  status, 
  lotteryName, 
  ticketNumber, 
  userPrize, 
  poolPrize, 
  date,
  onClaim 
}: TicketNFTProps) {
  const statusColors = {
    won: 'text-secondary',
    pending: 'text-yellow-500',
    lost: 'text-red-500'
  };

  const statusText = {
    won: 'you won!',
    pending: 'pending',
    lost: 'you lost'
  };

  return (
    <div className="bg-primary flex flex-col rounded-[12px] p-[12px] gap-[12px]">
      <div className="flex flex-row justify-between">
        <h3 className={`h-[30px] text-[16px] font-semibold ${statusColors[status]}`}>
          {statusText[status]}
        </h3>
        <div className="flex flex-row gap-2.5">
          {
            date.map(d => (
              <div className="bg-ligth-blue rounded-[8px] px-[12px] py-[4px]" key={d}>{d}</div>
            ))
          }
        </div>
      </div>

      <div className="flex flex-row justify-between text-text-white">
        <h3 className="text-[24px] font-bold">{lotteryName}</h3>
        {status === 'won' && onClaim && (
          <button 
            onClick={onClaim}
            className="bg-secondary px-[12px] py-[4px] rounded-[8px]"
          >
            claim
          </button>
        )}
      </div>

      <div className="flex flex-row justify-between text-text-white font-semibold">
        <h3>Number</h3>
        <div>{ticketNumber}</div>
      </div>

      {userPrize && (
        <div className="flex flex-row justify-between text-text-white font-semibold">
          <h3>Your prize</h3>
          <div>{typeof userPrize === 'number' ? `${userPrize} SUI` : userPrize}</div>
        </div>
      )}

      <div className="flex flex-row justify-between text-text-white font-semibold">
        <h3>Pool prize</h3>
        <div>{typeof poolPrize === 'number' ? `${poolPrize} SUI` : poolPrize}</div>
      </div>
    </div>
  )
}

export default TicketNFT