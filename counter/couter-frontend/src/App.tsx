import './App.css'
import { CenteredBox } from './components/CenteredBox'
import { useCurrentAccount, useSuiClientQuery, useSuiClient } from '@mysten/dapp-kit';


function App() {
  const account = useCurrentAccount();
  return (
    <> 
      <div className="max-width">
        <div className="divider">
          <span>Public Counter</span>
        </div>

        <CenteredBox label="Counter 1" value={464} />


        <div className="divider">
          <span>Private Counter</span>
          <button className="add-button" onClick={() => console.log('Add clicked')}>
            Add
          </button>
        </div>
        <CenteredBox label="Counter 2" value={200} onDelete={() => console.log('Delete clicked')} />
        <CenteredBox label="Counter 3" value={54} onDelete={() => console.log('Delete clicked')} />
        <CenteredBox label="Counter 4" value={76} onDelete={() => console.log('Delete clicked')}/>

        {account ? <OwnedObjects address={account.address}></OwnedObjects>
        : null}
        

      </div>

    </>
  )
}

function OwnedObjects({ address }: { address: string }) {
	const { data } = useSuiClientQuery('getOwnedObjects', {
		owner: address,
	});
	if (!data) {
		return null;
	}

  console.log("Object data: ", data.data);
	return (
		// <ul>
		// 	{data.data.map((object) => (
		// 		<li key={object.data?.objectId}>
		// 			<a href={`https://example-explorer.com/object/${object.data?.objectId}`}>
		// 				{object.data?.objectId}
		// 			</a>
		// 		</li>
		// 	))}
		// </ul>

    null
	);
}

export default App
