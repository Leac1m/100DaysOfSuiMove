interface PageNameProps {
    text: string
}

const PageName = ({text}: PageNameProps) => {
  return (
    <div className="text-[33.81px] font-bold mt-5">{text}</div>
  )
}

export default PageName;