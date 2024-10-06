import Card from "@/components/card/card";
import { useProducts } from "@/context/products-context";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "@/lib/apiRequest";

import { CgSpinner } from "react-icons/cg";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Product } from "@/types/product";

const ProductPage = () => {
  const params = useParams();
  const { id } = params;

  // const [{ isPending }] = usePayPalScriptReducer();

  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [messageIsLoading, setMessageIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    e.preventDefault();
    setMessageIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get("username");
      const tel = formData.get("tel");
      const email = formData.get("email");
      const city = formData.get("city");
      const title = product?.title;

      console.log("title: ", title);

      const orderInfo = { username, tel, email, city, title, quantity, id };

      const res = await apiRequest.post("/email/order-email", orderInfo);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setMessageIsLoading(false);
      setTimeout(() => {
        setMessage("");
        e.currentTarget.reset();
      }, 4500);
    }
  };

  const { latestProducts } = useProducts();

  const latestFourProducts = latestProducts?.slice(0, 4);

  const cityOptions = [
    "Ariana",
    "Beja",
    "Ben Arous",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kasserine",
    "Kef",
    "Mahdia",
    "Manouba",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Sousse",
    "Siliana",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
    "Medenine",
    "Kebili",
    "Kairouan",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiRequest(`/products/${id}`);
        // console.log("res: ", res)

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-[70vh]">
      {loading ? (
        <CgSpinner className="w-6 h-6 animate-spin mx-auto my-64" />
      ) : (
        <div className="w-[90vw] sm:w-[85vw] md:w-[90vw] lg:w-[70vw] h-full py-12 m-auto  flex flex-col md:flex-row items-center gap-x-14">
          <div className="w-[200px] h-[300px] sm:w-[250px] sm:h-[390px] md:w-[380px] md:h-[600px]">
            <img
              src={product?.imgs[0]}
              className="object-cover w-full h-full shadow-md border border-zinc-600/50"
            />
          </div>
          <div className="flex-1">
            <article className="text-zinc-900 space-y-1">
              <h2 className="text-center mt-4 md:mt-0 md:text-left text-5xl capitalize font-semibold ">
                {product?.title}
              </h2>
              <h2 className="font-bold text-3xl text-zinc-950">
                {product?.price} TND
              </h2>
              <h3>
                <span className="font-semibold">Category: </span>
                {product?.category}
              </h3>
              <p className="text-justify">
                <span className="font-semibold">Description: </span>
                {product?.desc}
              </p>
            </article>
            <div className="line w-full mx-auto my-4" />
            <p className="text-md mb-2">
              To place an order, please complete these fields:{" "}
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col space-y-4 flex-1"
            >
              <input
                type="text"
                name="username"
                required
                className="border-2 border-zinc-900 h-12 rounded-[.5rem] pl-4 placeholder:text-zinc-700 text-zinc-900 placeholder:text-sm"
                placeholder="Enter Your Name..."
              />
              <input
                type="tel"
                name="tel"
                required
                minLength={8}
                maxLength={8}
                className="border-2 border-zinc-900 h-12 rounded-[.5rem] pl-4 placeholder:text-zinc-700 text-zinc-900 placeholder:text-sm"
                placeholder="Your phone number..."
              />
              <input
                type="text"
                name="email"
                required
                className="border-2 border-zinc-900 h-12 rounded-[.5rem] pl-4 placeholder:text-zinc-700 text-zinc-900 placeholder:text-sm"
                placeholder="Your email address..."
              />

              <select
                required
                className="border-2 border-zinc-900 h-12 rounded-[.5rem] px-3 placeholder:text-zinc-700 text-zinc-900 placeholder:text-sm"
                aria-label="city"
                name="city"
              >
                <option value="" disabled selected>
                  Enter your city
                </option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2 w-full">
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  type="number"
                  name="quantity"
                  className="px-2 w-32 text-lg border-zinc-950 border-2 h-[52px] rounded-[.5rem] placeholder:text-black"
                  min={1}
                />
                <button
                  type="submit"
                  className="flex-1 bg-zinc-950 hover:bg-zinc-900 text-white h-[52px] rounded-[.5rem] transition-all flex items-center justify-center gap-x-2"
                >
                  Buy Now!
                  {messageIsLoading && (
                    <CgSpinner className="w-5 h-5 animate-spin" />
                  )}
                </button>
              </div>
              {message && (
                <div className="bg-green-700 px-4 py-4 text-white w-full text-md font-bold text-center rounded-[.5rem]">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      <div className="line w-[650px] mx-auto mt-6"></div>
      <h1 className="text-center text-4xl md:text-5xl my-6 md:my-10">
        Our Latest Products
      </h1>
      <div className="mx-auto w-4/5 md:w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-8 md:px-24 pb-12 justify-items-center justify-center">
        {latestFourProducts?.map((p: any) => (
          <Card product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

//  paypal buttons

// <div className="my-3">
// {isPending ? (
//   <CgSpinner className="w-5 h-5 animate-spin text-yellow-500" />
// ) : null}
// <PayPalButtons
//   fundingSource="paypal"
//   createOrder={(data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: (product?.price * quantity).toString(), // Ensure this is a string
//           },
//         },
//       ],
//     });
//   }}
//   onApprove={async (data, actions) => {
//     const order = await actions.order.capture();
//     console.log("Order", order);

//     // Optionally send order info to your backend
//     // await handlePaypal({
//     //   /* your order info */
//     // });
//   }}
//   onError={(err) => {
//     console.error("PayPal Checkout onError", err);
//   }}
// />
// </div>
