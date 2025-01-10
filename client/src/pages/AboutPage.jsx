const AboutPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-6xl mx-auto p-3'>
        <div className=''>
          <h1 className='text-3xl font font-semibold text-center my-5'>
            About Stacodev&apos;s Blog
          </h1>
          <div className=''>
            <p>
              Welcome to Stacodev, where we specialize in empowering developers
              with the knowledge and tools necessary to create exceptional
              digital experiences. Our mission is to bridge the gap between
              innovative technology and user-friendly design, making it easier
              for developers to build, manage, and optimize their projects.
            </p>
            <h3 className='text-xl my-3 font-bold text-teal-400'>
              Our Expertise
            </h3>
            <p className='mb-3'>
              At Stacodev, we focus on full-stack development, which encompasses
              both the frontend and backend of web applications. This dual
              expertise allows us to offer comprehensive solutions that not only
              look great but also function seamlessly. Our team is proficient in
              a variety of technologies, including:
            </p>
            <ul className='space-y-1 text-gray-500 list-disc list-inside dark:text-gray-300 mb-3'>
              <li>
                HTML/CSS: The foundational languages for structuring and styling
                web pages.
              </li>
              <li>
                JavaScript: Essential for creating interactive and dynamic user
                experiences.
              </li>
              <li>
                Backend Technologies: Utilizing languages such as PHP, Ruby,
                Java, and Python to handle server-side operations and database
                management.
              </li>
            </ul>
            <h3 className='text-xl my-3 font-bold text-teal-400'>
              Our Commitment
            </h3>
            <p>
              We are committed to continuous learning and improvement in the
              ever-evolving tech landscape. Our blog serves as a platform for
              sharing insights, tutorials, and best practices related to web
              development. Whether you&apos;re a seasoned developer or just
              starting out, our content aims to inspire and educate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
