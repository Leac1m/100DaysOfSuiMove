import './App.css'
import PrivateCounters from './components/PrivateCounters';
import PublicCounter from './components/PublicCounter';
import { useCounter } from './smc_interact';


function App() {
  const counter = useCounter();
  return (
    <> 
      <div className="max-width">
        <div className="divider">
          <span>Public Counter</span>
        </div>

        <PublicCounter />


        <div className="divider">
          <span>Private Counter</span>
          <button className="add-button" onClick={counter.createCounter}>
            Add
          </button>
        </div>
        {/* <CenteredBox label="Counter 2" value={200} onDelete={() => console.log('Delete clicked')} />
        <CenteredBox label="Counter 3" value={54} onDelete={() => console.log('Delete clicked')} />
        <CenteredBox label="Counter 4" value={76} onDelete={() => console.log('Delete clicked')}/> */}

        {/* {account ? <CounterObjects address={account.address} />
        : null} */}

        <PrivateCounters />
        dd

      </div>

    </>
  )
}
export default App
