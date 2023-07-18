import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { addToWishList } from '@/redux/features/wishlist/wishListSlice';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const dispatch = useAppDispatch();
  // console.log(product);
  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };
  const handleAddToWishlist = (product: IProduct) => {
    dispatch(addToWishList(product));
    toast({
      description: 'Product Added To Wishlist',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[640px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product?._id}`} className="w-full">
          <img className='w-[80%]' src={product?.imageURL} alt="product" />
          <h1 className="text-xl font-semibold">{product?.Title}</h1>
        </Link>
        <p>Author: {product?.Author}</p>
        <p>Genre: {product?.Genre}</p>
        <p>Rating: {product?.Rating}</p>
        {/* <p>Publication Date: {product?.Publication_Date}</p> */}
        <p className="text-sm">
          Availability: {product?.status ? 'In stock' : 'Out of stock'}
        </p>
        <p className="text-sm">Price: {product?.Price}</p>
        <div className='flex' title='Add To Cart'>
          <Button variant="ghost" onClick={() => handleAddProduct(product)}>
            <FontAwesomeIcon className='text-indigo-950 text-2xl' icon={faCartShopping}></FontAwesomeIcon>
          </Button>
          <Button title='Add To Wish List' variant="ghost" onClick={() => handleAddToWishlist(product)}>
            <FontAwesomeIcon className='text-amber-700 text-2xl' icon={faHeart}></FontAwesomeIcon>
          </Button>
          <Button title='Add To Read List' variant="ghost" onClick={() => handleAddProduct(product)}>
            <FontAwesomeIcon className='text-cyan-600 text-2xl' icon={faBookReader}></FontAwesomeIcon>
          </Button>
        </div>
      </div>
    </div>
  );
}
