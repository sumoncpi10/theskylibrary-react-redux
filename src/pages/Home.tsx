import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.png';
import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto w-[80%] mt-8">
        <div className=''>
          <h1 className="text-6xl font-black text-primary mb-2 ">
            Secrets of the <br />  Titanic
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Effortless communication at your fingertips
          </p>
          <div className="text-primary mt-20">
            <p>Bluetooth 5.2 for easy, secure communication</p>
            <p>Precise 143 Amoled display for clear visuals</p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-14 w-[55%]">
          <img src={banner} className='w-[85%]' alt="" />
        </div>
      </div>
      <div className="mb-96 mt-24">
        <div>
          <img className="mx-auto" src={hero} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
            The future of The Sky Library is here
          </h1>
          <Button className="mt-10" asChild>
            <Link to="/books">Brows all Books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
