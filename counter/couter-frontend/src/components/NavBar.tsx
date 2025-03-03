import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

function NavBar() {
    const account = useCurrentAccount();


  return (
    <nav className="navbar">
          <div className="logo">MyApp</div>
          
          { account ? <div>Connect</div> : <ConnectButton className='connect-button'/>}
          {/* <button className="connect-button">Connect</button> */}
    </nav>
  )
}

export default NavBar