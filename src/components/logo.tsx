import { Link } from "react-router-dom"

const Logo = ({bg= "white"}) => {
  return (
    <Link to="/" reloadDocument className="flex items-center gap-x-2 cursor-pointer !bg-transparent">
        <img src="/logo.png" className={`${bg == "black" && "invert"} w-12 md:w-16 h-12 md:h-16 `}/>
        <h1 className={`${bg == "black" && "text-white"} text-2xl md:text-3xl`}>FashionFinds</h1>
    </Link>
  )
}

export default Logo
