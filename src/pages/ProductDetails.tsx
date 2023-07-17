import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useDeleteProductMutation, useGetProductsQuery, useSingleProductQuery } from '@/redux/features/products/productApi';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt,faFileAlt} from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from '@/components/ui/use-toast';
import { getAuth } from 'firebase/auth';
export default function ProductDetails() {
  const { id } = useParams();
  const firebaseAuth = getAuth();
  const { data: product, isLoading, error } = useSingleProductQuery(id);
  console.log(product);
  // console.log(dataP);
  const dispatch = useAppDispatch();
  const navigate=useNavigate();
  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };
  const handleUpdateProduct = (_id:any) => {
    const shouldNavigate = window.confirm("Are you sure you want to update the book?");
    
    if (shouldNavigate) {
      navigate(`/edit-book/${_id}`);
    }
  };
  const [deleteComment] =useDeleteProductMutation();
  const handleDeleteProduct = async(_id:number) => {
    const shouldDelete = window.confirm("Are you sure you want to Delete the book?");
    console.log(_id);
    if (shouldDelete) {
      try {
       
        const res=await deleteComment(  _id  );
        if(res){
          toast({description:"Book Delete Successfuly"});
          console.log(res);
          navigate("/books"); 
          // setProductsData(prevData => prevData.filter((product: IProduct) => product?._id !== _id));

          // window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          description: 'Error deleting product',
          // status: 'error',
        });
      }
    }
  };
  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300 column">
        <div className="w-[50%]">
          <img className="w-[35%] mx-auto" src={product?.imageURL} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
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
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
