import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';

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
        <p>Publication Date: {product?.Publication_Date}</p>
        <p className="text-sm">
          Availability: {product?.status ? 'In stock' : 'Out of stock'}
        </p>
        <p className="text-sm">Price: {product?.Price}</p>
        <Button variant="default" onClick={() => handleAddProduct(product)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
