const items = [
  'Game', 'Result', 'Profile'
]

const NavBar = () => {
  return (
    <div className="flex justify-center w-80 bg-white align-middle gap-[60px] rounded-[12px] text-nav-brown font-semibold border-2">
      <Items items={items} />
    </div>
  )
}

export default NavBar;

interface ItemsProps {
  items: string []
}

const Items = ({items}: ItemsProps) =>  {
  return items.map(i => (
    <div className="flex flex-col items-center" key={i}>
      <div className="h-[33px] w-[33px] bg-primary mt-2"></div>
      <div className="">{i}</div>
    </div>
  ))
}

