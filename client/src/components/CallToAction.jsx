import { Button } from 'flowbite-react';

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 justify-center items-center border border-teal-300 rounded-tl-3xl rounded-br-3xl m-3 text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Want to learn Next js</h2>
        <p className='text-green-600 my-2'>Checkout this 100 Nextjs Projects</p>
        <Button
          gradientDuoTone='purpleToPink'
          className='rounder-t-xl rounded-b-none m-3 p-2 text-xl'
        >
          <a
            href='https://prismic.io/blog/nextjs-example-projects'
            target='_blank'
            rel='noopener noreferrer'
          >
            Next.js Example Projects to Build in 2024
          </a>
        </Button>
      </div>
      <div className='flex-2 p-7'>
        <img
          src='https://media.geeksforgeeks.org/wp-content/uploads/20240611123110/Top-NextJS-Projects-to-Become-a-Better-Developer-copy.webp'
          alt='action'
          className='sm:max-w-sm h-auto max-w-full'
        />
      </div>
    </div>
  );
};

export default CallToAction;
