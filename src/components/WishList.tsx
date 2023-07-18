import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { IProduct } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addToCart,
  removeFromCart,
  
} from '@/redux/features/cart/cartSlice';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToWishList, removeFromWishList,removeOne } from '@/redux/features/wishlist/wishListSlice';

export default function WishList() {
  const { products, total } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      {/* <SheetTrigger>
        <Button variant="ghost">
          <HiOutlineShoppingCart size="25" />
        </Button>
      </SheetTrigger> */}
      <SheetTrigger>
        <Button variant="ghost">
          {/* <HiOutlineShoppingCart size="25" /> */}
          <FontAwesomeIcon className='text-amber-700 text-2xl' icon={faHeart}></FontAwesomeIcon>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle><FontAwesomeIcon className='text-amber-700' icon={faHeart}></FontAwesomeIcon>  (WishList)</SheetTitle>
          <h1>Total: {total.toFixed(2)}</h1>
        </SheetHeader>
        <div className="space-y-5">
          {products.map((product) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={product.Title}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={product?.imageURL} alt="" className="h-full" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{product?.Title}</h1>
                <p>Author: {product.Author}</p>
                <p className="text-xl">
                  Genre: {product.Genre}
                </p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                {/* <Button onClick={() => dispatch(addToWishList(product))}>
                  <HiOutlinePlus size="20" />
                </Button>
                <Button onClick={() => dispatch(removeOne(product))}>
                  <HiMinus size="20" />
                </Button> */}
                <Button
                  onClick={() => dispatch(removeFromWishList(product))}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
