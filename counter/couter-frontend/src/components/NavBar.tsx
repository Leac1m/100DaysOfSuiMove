import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

function NavBar() {
    const account = useCurrentAccount();


  return (
    <nav className="navbar">
          <div className="logo">MyApp</div>
          
          { account ? <div>Connected</div> : <ConnectButton className='connect-button' connectText="Connect wallet" />}
          {/* <button className="connect-button">Connect</button> */}
    </nav>
  )
}

export default NavBar