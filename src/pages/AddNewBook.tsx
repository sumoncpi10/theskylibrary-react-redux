import  { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAddProductMutation } from '@/redux/features/products/productApi';
import { IProduct } from '@/types/globalTypes';
// import { useAppDispatch } from '@/redux/hook';
import { getAuth } from 'firebase/auth';

export default function AddNewBook(): JSX.Element {
 const [addProduct] = useAddProductMutation();
  const firebaseAuth = getAuth();
  // const dispatch = useAppDispatch();
  // const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<IProduct>({
    _id: 0,
    Title: '',
    Author: '',
    Genre: '',
    Price: 10,
    Publication_Date: "",
    Rating: 0,
    imageURL: '',
    status: true,
    addBy: firebaseAuth?.currentUser?.email
  });

  const handleAddProduct = async () => {
    try {
      await addProduct(bookData);
      toast({
      description: 'Book added successfully!!!!',
    });
     
      navigate('/books');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const dateObject = new Date(value);

    // Format the date in the "Month day, year" format
     const formattedDate:string = `${getMonthName(dateObject.getMonth() + 1)} ${dateObject.getDate()}, ${dateObject.getFullYear()}`!;

    setBookData((prevData) => ({ ...prevData, [name]: value }));
    const { Publication_Date, ...rest } = bookData;
   
    const newProduct = { Publication_Date: formattedDate, ...rest };
    setBookData(newProduct);
  };

  function getMonthName(monthNumber: number): string {
    const months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  }


  return (
    <>
      <div className="grid-cols-4 max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="">
          <h3 className="text-4xl font-semibold mx-auto text-center mb-2">Add Your Book</h3>
        </div>
        <div>
          <p className="font-bold">Id: </p>
          <Input
            className="mb-3"
            type="number"
            name="_id"
            value={bookData._id}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="font-bold">Title: </p>
          <Input
            className="mb-3"
            type="text"
            name="Title"
            value={bookData.Title}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="font-bold">Author: </p>
          <Input
            className="mb-3"
            type="text"
            name="Author"
            value={bookData.Author}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="font-bold">Genre: </p>
          <Input
            className="mb-3"
            type="text"
            name="Genre"
            value={bookData.Genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="font-bold">Publication Date: </p>
          <Input
            className="mb-3"
            type="date"
            name="Publication_Date"
            // value={bookData?.Publication_Date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <p className="font-bold">Rating: </p>
          <Input
            className="mb-3"
            type="number"
            name="Rating"
            value={bookData.Rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="font-bold">Image URL: </p>
          <Input
            className="mb-3"
            type="text"
            name="imageURL"
            value={bookData.imageURL}
            onChange={handleChange}
          />
        </div>
          
        <Button className="mx-2" onClick={handleAddProduct}>
          Add Book
        </Button>
      </div>
    </>
  );
}
