import CallToAction from '../components/CallToAction';

const Projects = () => {
  return (
    <div className='min-h-screen flex flex-col gap-3 p-5 justify-center max-w-7xl items-center mx-auto'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p>
        Build project for learning and enjoying to create in HTML, nodejs,
        reactjs, mongodb etc...
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
