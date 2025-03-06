import { useSuiClientQuery, useCurrentAccount } from "@mysten/dapp-kit";
import { CenteredBox } from './Counter';
import { useCounter } from "../smc_interact";

function PublicCounter() {
  const publicCounterId = import.meta.env.VITE_PUBLIC_COUNTER;
  const counter = useCounter();

  const { data, isError, isLoading } = useSuiClientQuery('getObject', {
    id: publicCounterId || '',
    options: {
      showContent: true,
    },
  }, {
    refetchInterval: 1000,
    staleTime: 500,
  });
  
  if (!publicCounterId) {
    console.error("PUBLIC_COUNTER environment variable is not set");
    return <div>Error: Public counter ID not configured</div>;
  }

  if (isLoading) {
    return <div>Loading public counter...</div>;
  }

  if (isError) {
    console.error("Failed to fetch public counter data");
    return <div>Error loading public counter</div>;
  }

  if (data?.error) {
    console.error(`Public counter ${data.error.code}`);
    return <div>Error: Public counter object not found</div>;
  }

  console.log(data)
  const value = data?.data?.content?.fields?.value;

  return (
    <CenteredBox
      label={publicCounterId}
      value={value}
      onIncrement={() => {counter.incrementCounter(publicCounterId)}}
      onDecrement={() => {counter.decrementCounter(publicCounterId)}}
    />
  );
}

export default PublicCounter;