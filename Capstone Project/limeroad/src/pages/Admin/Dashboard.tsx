import React, {
  useEffect,
  useState,
} from 'react';

const Dashboard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // banner urls
  const banners = [
    "https://n-img1.junaroad.com/assets/images/mobileNotif/img-1726565462850.jpg",
    "https://n-img1.junaroad.com/assets/images/mobileNotif/img-1732367163662.jpg?crsl_pos=4",
    "https://n-img1.junaroad.com/assets/images/mobileNotif/img-1731526969807.jpg?crsl_pos=4",
    "https://n-img1.junaroad.com/assets/images/mobileNotif/img-1728895397868.jpg?crsl_pos=4",
    "https://n-img1.junaroad.com/assets/images/mobileNotif/img-1730729022284.jpg?crsl_pos=4",
  ];

  //setTime interval for banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [banners.length]);

  const categories = [
    { label: "MY FEED", icon: "MY", link: "/" },
    { label: "WINTER", icon: "❄️", link: "/winter" },
    { label: "KURTAS", icon: "👗", link: "/kurtas" },
    { label: "TOPS", icon: "👚", link: "/tops" },
    { label: "DRESSES", icon: "👗", link: "/dresses" },
    { label: "SAREES", icon: "🥻", link: "/sarees" },
    { label: "SUITS", icon: "🧥", link: "/suits" },
    { label: "ETHNIC SETS", icon: "🌺", link: "/ethnic-sets" },
    { label: "BOTTOMS", icon: "👖", link: "/bottoms" },
    { label: "BAGS", icon: "👜", link: "/bags" },
    { label: "FOOTWEAR", icon: "👠", link: "/footwear" },
    { label: "ADD ONS", icon: "➕", link: "/add-ons" },
    { label: "HOME", icon: "🏠", link: "/home" },
    { label: "LINGERIE", icon: "👙", link: "/lingerie" },
  ];

  return (
    <div className="bg-gray-100">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        {/* Logo */}
        {/* <div className="text-2xl font-bold text-gray-800">My</div> */}

        {/* Categories */}
        <nav className="flex space-x-6 ml-20 text-gray-700 font-medium">
          <a href="/women" className="hover:text-gray-900">
            WOMEN
          </a>
          <a href="/men" className="hover:text-gray-900">
            MEN
          </a>
          <a href="/kids" className="hover:text-gray-900">
            KIDS
          </a>
        </nav>
      </div>

      {/* Subcategories */}
      <div className="flex overflow-x-auto py-4 px-8 bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              // Replace this with your navigation logic (e.g., React Router)
              console.log(`Navigating to ${category.link}`);
            }}
            className="flex flex-col items-center mr-6 focus:outline-none"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
              {category.icon}
            </div>
            <span className="text-sm mt-2">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Banners */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
