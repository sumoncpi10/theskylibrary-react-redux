// import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useSingleProductQuery, useUpdateProductMutation } from '@/redux/features/products/productApi';
// import { IProduct } from '@/types/globalTypes';
import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faTrashAlt,faFileAlt} from '@fortawesome/free-solid-svg-icons'
// import { useAppDispatch } from '@/redux/hook';
// import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from '@/components/ui/use-toast';
// import { getAuth } from 'firebase/auth';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
export default function UpdateBooks() {
  const { id } = useParams();
  // const firebaseAuth = getAuth();
  const { data: product, isLoading, error } = useSingleProductQuery(id,{refetchOnMountOrArgChange: true});
  console.log(product,error,isLoading);
  const [updateProducts] =  useUpdateProductMutation();
  // console.log(dataP);
  // const dispatch = useAppDispatch();
  const navigate=useNavigate();
  

  
   const handleUpdateProduct = async() => {
    // event.preventDefault();
    // console.log(event);

    const options = {
      id: updatedProduct?._id,
      data: updatedProduct,
    };
    await updateProducts(options);
    setUpdatedProduct({});
    navigate("/books");
   toast({
      description: 'Book Updated Successfully!!!',
    });
    // postComment(options);
    // setInputValue('');
  };

  
   const [updatedProduct, setUpdatedProduct] = useState(product);

  const titleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { Title, ...rest } = updatedProduct;
    const newName = e.target.value;
    const newProduct = { Title: newName, ...rest };
    setUpdatedProduct(newProduct);
  };
  const AuthorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { Author, ...rest } = updatedProduct;
    const newName = e.target.value;
    const newProduct = { Author: newName, ...rest };
    setUpdatedProduct(newProduct);
  };
  const GenreChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { Genre, ...rest } = updatedProduct;
    const newName = e.target.value;
    const newProduct = { Genre: newName, ...rest };
    setUpdatedProduct(newProduct);
  };
  const RatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { Rating, ...rest } = updatedProduct;
    const newName = e.target.value;
    const newProduct = { Rating: newName, ...rest };
    setUpdatedProduct(newProduct);
  };
  // const Publication_DateChange = (e: ChangeEvent<HTML>) => {
  //   const { Publication_Date, ...rest } = updatedProduct;
  //   const newName = e.target.value;
  //   const newProduct = { Publication_Date: newName, ...rest };
  //   setUpdatedProduct(newProduct);
  // };
// const formattedDate = new Date(updatedProduct?.Publication_Date).toISOString().split('T')[0];

  return (
    <>
    
      <div className="grid-cols-4 max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="">
          <h3 className="text-4xl font-semibold mx-auto text-center mb-2">{product?.Title}</h3>
          <img className="w-[15%] mx-auto mb-3" src={updatedProduct?.imageURL} alt="" />
        </div>
        <div>
          <p className='font-bold'>Title: </p>
          <Textarea
            className="mb-3"
            onChange={titleChange}
            value={updatedProduct?.Title}
          />
         
        </div>
        <div>
          <p className='font-bold'>Author: </p>
          <Textarea
            className="mb-3"
            onChange={AuthorChange}
            value={updatedProduct?.Author}
          />
        </div>
        <div>
          <p className='font-bold'>Genre: </p>
          <Textarea
            className="mb-3"
            onChange={GenreChange}
            value={updatedProduct?.Genre}
          />
        </div>
        <div>
          <p className='font-bold'>Rating: </p>
          <Input
            className="mb-3"
            type='number'
            onChange={RatingChange}
            value={updatedProduct?.Rating}
          />
        </div>
        {/* <div>
          <p className='font-bold'>Publication Date: </p>
          <Input
            className="mb-3"
            type='date'
            // onChange={Publication_DateChange}
            value={formattedDate}
          />
        </div> */}
       
         <Button className='mx-2' onClick={() => handleUpdateProduct()}>Update Product</Button>
        {/* <div className="w-[50%] space-y-3">
          <h1 className="text-4xl font-semibold">{product?.Title}</h1>
          <h1 className="text-3xl ">Author:  {product?.Author}</h1>
          <h1 className="text-2xl font-semibold">Genre:  {product?.Genre}</h1>
          <h1 className="text-xl font-semibold">{product?.Publication_Date}</h1>
          <p className="text-xl">Rating: {product?.Rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className='flex space-between '>
            <Button className='mx-2' onClick={() => handleAddProduct(product)}>Add to cart</Button>
            {firebaseAuth?.currentUser?.email ==product?.addBy?<>
            <Button onClick={() => handleUpdateProduct(product?._id)} className='mx-2  text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'><FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon></Button>
            <Button onClick={() => handleDeleteProduct(product?._id)} className='mx-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300'><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></Button></>:""
            }
          </div>
        </div> */}
      </div>
      {/* <ProductReview id={id!} /> */}
    </>
  );
}
