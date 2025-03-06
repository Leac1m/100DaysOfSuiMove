import { useSuiClientQuery, useCurrentAccount } from "@mysten/dapp-kit";

import { CenteredBox } from "./Counter";
import { useCounter } from "../smc_interact";

function PrivateCounters() {
  const account = useCurrentAccount();

  if (!account) return null;
  return <CounterObjects address={account.address} />;
}

export default PrivateCounters;

function CounterObjects({ address }: { address: string }) {
  const counter = useCounter();
  const { data } = useSuiClientQuery("getOwnedObjects", {
    owner: address,
    filter: {
      MatchAll: [
        {
          StructType: `${import.meta.env.VITE_PACKAGE_ID}::counter::Counter`,
        },
      ],
    },
    options: {
      showType: true,
      showContent: true,
    },
  }, {
    refetchInterval: 1000,
    staleTime: 500,
  });
  if (!data) {
    return null;
  }

  console.log("Counter objects: ", data.data);

  return (
    data.data.map((object) => (
        <CenteredBox
          label={object.data?.objectId || ''}
          value={object.data?.content?.fields.value}
          onIncrement={() => counter.incrementCounter(object.data?.objectId || '')}
          onDecrement={() => counter.decrementCounter(object.data?.objectId || '')}
        />
        // <li key={object.data?.objectId}>
        // 	<div>
        // 		<h3>Counter ID: {object.data?.objectId}</h3>
        // 		<p>Value: {
        // 			object.data?.content?.dataType === "moveObject"
        // 			? (object.data.content.fields as { value: number }).value
        // 			: null
        // 		}</p>
        // 	</div>
        // </li>
      ))
  );
}
