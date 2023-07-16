import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUser } from '@/redux/features/user/userSlice';
import { useGetProductsQuery, useSearchProductsQuery } from '@/redux/features/products/productApi';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../components/ui/dropdown-menu';
import Cart from '../components/Cart';
import logo from '../assets/images/logos-removebg-preview (1).png';
import { setSearchBooks } from '@/redux/features/products/productSlice';

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const firebaseAuth = getAuth(); // Rename the variable to avoid conflict with the 'auth' import

  const { data } = useSearchProductsQuery(searchQuery);
   const stateValue = useAppSelector((state) => state.product);
   const { searchBooks } = useAppSelector((state) => state.product);
  console.log(data);
  console.log(stateValue);
  if(data?.data){
    dispatch(setSearchBooks(data.data))
  }
  const handleLogout = () => {
    console.log('Logout');
    signOut(firebaseAuth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
    });
  };
  
  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleBookSearch = () => {
    // const { data } = useSearchProductsQuery(searchQuery);
    // Handle the search query data here
    // dispatch(product(data?.data));
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto">
          <div>
            <img className="h-8" src={logo} alt="log" />
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    placeholder="Search"
                    className="py-2 pr-8 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <button
                    onClick={handleBookSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                  >
                    <HiOutlineSearch size={20} />
                  </button>
                </div>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/books">Books</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </li>
              {/* <li>
                <Button variant="ghost">
                  <HiOutlineSearch size={25} />
                </Button>
              </li> */}
              <li>
                <Cart />
              </li>
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar>
                      {firebaseAuth?.currentUser?.email ? (
                        <AvatarImage src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-line-black-icon-png-image_691051.jpg" />
                      ) : (
                        <AvatarImage src="" />
                      )}
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {!user.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            Sign up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {user.email && (
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
