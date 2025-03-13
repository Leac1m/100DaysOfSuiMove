import TicketNFT from "./assets/TicketNFT"

interface Ticket {
  status: 'won' | 'pending' | 'lost';
  lotteryName: string;
  ticketNumber: number;
  userPrize?: number;
  poolPrize: number;
  date: string;
}

interface TicketsProps {
  tickets: Ticket[];
  onClaimPrize?: (ticketNumber: number) => void;
}

export const Tickets = ({ tickets, onClaimPrize }: TicketsProps) => {
  if (!tickets.length) {
    return (
      <div className="flex justify-center items-center p-4 text-gray-500">
        No tickets found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {tickets.map((ticket) => (
        <TicketNFT
          key={ticket.ticketNumber}
          {...ticket}
          onClaim={
            ticket.status === 'won' && onClaimPrize
              ? () => onClaimPrize(ticket.ticketNumber)
              : undefined
          }
        />
      ))}
    </div>
  );
};



function TicketList() {
// Example usage with more diverse tickets:
const demoTickets = [
    {
      status: 'won',
      lotteryName: 'UroMillions',
      ticketNumber: 83,
      userPrize: 225,
      poolPrize: 1000,
      date: ['16th Feb', '6:30pm']
    },
    {
      status: 'pending',
      lotteryName: 'Daily Draw',
      ticketNumber: 45,
      poolPrize: 500,
      date: ['Tommorrow', '6:30pm']
    },
    {
      status: 'lost',
      lotteryName: 'Weekly Jackpot',
      ticketNumber: 127,
      poolPrize: 2500,
      date: ['Today', '6:30pm']
    },
    {
      status: 'won',
      lotteryName: 'Flash Draw',
      ticketNumber: 92,
      userPrize: 50,
      poolPrize: 300,
      date: ['20th Sept', '6:30pm']
    },
    {
      status: 'pending',
      lotteryName: 'UroMillions',
      ticketNumber: 164,
      poolPrize: 1500,
      date: ['21th Dec', '6:30pm']
    },
    {
      status: 'lost',
      lotteryName: 'Daily Draw',
      ticketNumber: 73,
      poolPrize: 750,
      date: ['16th Feb', '6:30pm']
    }
  ];
  
  const handleClaimPrize = (ticketNumber: number) => {
    console.log(`Claiming prize for ticket ${ticketNumber}`);
    // Add your claim logic here
  };
  
  return (
    <Tickets 
    tickets={demoTickets as Ticket[]} 
    onClaimPrize={handleClaimPrize}
  />
  )
}

export default TicketList
  