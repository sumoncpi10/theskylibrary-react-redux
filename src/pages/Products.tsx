import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
// import { useToast } from '@/components/ui/use-toast';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import {
  setGenre,
  setPriceRange,
  setYearRange,
  toggleState,
} from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Products() {
  const { data, isLoading, error } = useGetProductsQuery(undefined,{
    refetchOnMountOrArgChange: true,
  });
  console.log(isLoading,error);
  // const { toast } = useToast();

  const { searchBooks, status,genre, priceRange,yearRange } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  console.log(searchBooks, status,priceRange,yearRange,genre, data?.data );
  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };
  const handleSliderYear = (value: number[]) => {
    dispatch(setYearRange(value[0]));
  };
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    dispatch(setGenre(selectedGenre));
  };
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  useEffect(() => {
  
    if (!searchBooks.length && status && priceRange > 0 && yearRange > 1900 && !genre) {
      console.log("hi");
      const filteredData = data?.data.filter((item: { status: boolean; Price: number, Publication_Date: Date }) => {
        return item.status === true && item.Price < priceRange && (new Date(item?.Publication_Date).getFullYear() < yearRange) 
      });
      setProductsData(filteredData);
    }

    else if (!searchBooks.length  && priceRange > 0 && yearRange > 1900 && !genre) {
      // setProductsData(data?.data ?? []);
      const filteredData = data?.data.filter(
        (item: {Price: number ,Publication_Date: Date }) =>
          item.Price < priceRange && new Date(item?.Publication_Date).getFullYear() < yearRange 
      );
      setProductsData(filteredData);
    } 
    else if (!searchBooks.length && status && priceRange > 0 && yearRange > 1900 && genre) {
      console.log("hi");
      const filteredData = data?.data.filter((item: { status: boolean; Price: number, Publication_Date: Date,Genre:string }) => {
        return item.status === true && item.Price < priceRange && (new Date(item?.Publication_Date).getFullYear() < yearRange) && item.Genre == genre;
      });
      setProductsData(filteredData);
    }

    else if (!searchBooks.length  && priceRange > 0 && yearRange > 1900 && genre) {
      // setProductsData(data?.data ?? []);
      const filteredData = data?.data.filter(
        (item: {Price: number ,Publication_Date: Date,Genre:string }) =>
          item.Price < priceRange && new Date(item?.Publication_Date).getFullYear() < yearRange && item.Genre == genre
      );
      setProductsData(filteredData);
    } 
    else if (searchBooks.length > 0 && status && priceRange > 0 && yearRange > 1900)  {
      const filteredData = searchBooks.filter(
        (item: { status: boolean; Price: number ,Publication_Date: Date}) =>
          item.status === true && item.Price < priceRange && new Date(item?.Publication_Date).getFullYear() < yearRange
      );
      setProductsData(filteredData);
    } 
    else if (searchBooks.length > 0  && priceRange > 0 && yearRange > 1900) {
      setProductsData(data?.data ?? []);
      const filteredData = searchBooks.filter(
        (item: {  Price: number ,Publication_Date: Date}) =>
           item.Price < priceRange && new Date(item?.Publication_Date).getFullYear() < yearRange
      );
      setProductsData(filteredData);
    } 
    else {
      const filteredData = data?.data.filter(
        (item: {  Price: number }) =>
          item.Price < priceRange
      );
      setProductsData(filteredData);
    }
  }, [data, searchBooks, priceRange,yearRange,status,genre]);
  // console.log(productsData);
 

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div
            onClick={() => dispatch(toggleState())}
            className="flex items-center space-x-2 mt-3"
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
         <div>
          <label htmlFor="genreFilter">Filter by Genre:</label>
          <select id="genreFilter" value={genre} onChange={handleFilterChange}>
            <option value="">All Genres</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Literary Fiction">Literary Fiction</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Coming-of-age">Coming-of-age</option>
            <option value="Adventure">Adventure</option>
            <option value="Philosophical">Philosophical</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Mystery">Mystery</option>
          </select>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[50]}
              max={50}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Year Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[2024]}
              max={2024}
              min={1900}
              step={1}
              onValueChange={(value) => handleSliderYear(value)}
            />
          </div>
          <div>From 1900y To {yearRange}y</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard key={product?._id} product={product}/>
        ))}
      </div>
    </div>
  );
}

