import { Link } from "react-router-dom";

interface CardProps {
  product: any;
}

const Card = ({ product }: CardProps) => {
  return (
    <div className="flex flex-col w-[100%] cursor-pointer h-full">
      <Link to={`/product/${product.id}`} reloadDocument className="h-full w-full">
        <img
          src={product?.imgs[0]}
          className={`imgShadow object-cover border border-zinc-950/70 !flex-1 hover:brightness-75 transition-all w-[150px] h-[200px] sm:w-[200px] sm:h-[270px] md:w-[250px] md:h-[350px] lg:w-[280px] lg:h-[430px]`}
        />
      </Link>
      <div className="text-center pt-2">
        <h2 className="text-sm md:text-md md:-mb-2 leading-3 md:leading-normal">
          {product?.title}
        </h2>
        <span className="font-bold text-xs md:text-sm">{product?.price} TND</span>
      </div>
    </div>
  );
};

export default Card;
