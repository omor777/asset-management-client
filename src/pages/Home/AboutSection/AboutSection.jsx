const AboutSection = () => {
  return (
    <div>
      <div className="lg:flex lg:items-center">
        <div className="lg:w-1/2 lg:pr-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Welcome to{' '}
            <span className="font-semibold text-primary">AssetAura</span>, your
            ultimate solution for efficient asset management. Our platform
            empowers organizations to seamlessly track, manage, and optimize
            their assets, ensuring maximum utilization and value. With real-time
            insights, robust analytics, and a user-friendly interface, AssetAura
            transforms asset management into a streamlined, hassle-free
            experience.
          </p>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            At AssetAura, we understand the importance of effective asset
            management in driving organizational success. Our goal is to provide
            you with the tools and insights needed to make informed decisions,
            reduce costs, and enhance operational efficiency.
          </p>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Join us on this journey to smarter asset management and discover how
            AssetAura can help you achieve your goals.
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 lg:pl-8">
          <img
            className="w-full rounded-lg"
            src="https://i.ibb.co/JCnSr5y/pexels-fauxels-3184339-1.jpg"
            alt="About us"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
