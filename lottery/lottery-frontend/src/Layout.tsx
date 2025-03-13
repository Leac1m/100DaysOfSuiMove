import NavBar from "./components/NavBar";
import PageName from "./components/assets/PageName";

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

function Layout({ children, pageTitle }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-[640px] max-w-[360px] mx-auto relative">
      <div className='fixed top-0 bg-white w-[360px] pb-12 z-10'>
        <button 
          className="absolute top-4 right-4 px-[20px] py-1 rounded-md text-white"
          style={{ backgroundColor: '#F8793E' }}
        >
          Connect
        </button>
        <div className='px-4 pt-4'>
          <PageName text={pageTitle}/>
        </div>
      </div>
      <div className='fixed top-20 backdrop-blur-lg mx-5 w-[320px] h-[60px] z-10'></div>
      
      <main className="flex-1 flex flex-col p-5 gap-2.5 mt-28 mb-20 overflow-y-auto">
        {children}
      </main>

      <div className="fixed bottom-0 left-0 px-5 right-0 mx-auto w-[360px]  pb-4 bg-white">
        <NavBar />
      </div>
    </div>
  )
}

export default Layout 