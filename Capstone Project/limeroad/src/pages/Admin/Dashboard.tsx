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
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [banners.length]);

  const categories = [
    {
      label: "MY FEED",
      icon: "MY",
      imageLink:
        "https://play-lh.googleusercontent.com/ju2YAmg1BkbjLVWWrGKScWNeithkVpWVI7_hqudk90Ia_S4xmS37zVSc8r6ehHFdo50",
      link: "/",
    },
    {
      label: "WINTER",
      icon: "❄️",
      imageLink:
        "https://i.pinimg.com/236x/31/47/fb/3147fbebbea1a21cedd3abb6a275dd70.jpg",
      link: "/winter",
    },
    {
      label: "KURTAS",
      icon: "👗",
      imageLink:
        "https://i.pinimg.com/736x/33/b5/e0/33b5e048b9fb14622192c657a1907d1b.jpg",
      link: "/kurtas",
    },
    {
      label: "TOPS",
      icon: "👚",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/20289724/zoom_0-1694529089.jpg",
      link: "/tops",
    },
    {
      label: "DRESSES",
      icon: "👗",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/21571964/zoom_0-1728476760.jpg",
      link: "/dresses",
    },
    {
      label: "SAREES",
      icon: "🥻",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/20299703/zoom_0-1694842242.jpg",
      link: "/sarees",
    },
    {
      label: "SUITS",
      icon: "🧥",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/21577155/zoom_0-1730290459.jpg",
      link: "/suits",
    },
    {
      label: "ETHNIC SETS",
      icon: "🌺",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/21311596/zoom_0-1731589560.jpg",
      link: "/ethnic-sets",
    },
    {
      label: "BOTTOMS",
      icon: "👖",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/21368079/zoom_0-1719937973.jpg",
      link: "/bottoms",
    },
    {
      label: "BAGS",
      icon: "👜",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/21457053/zoom_0-1724160265.jpg",
      link: "/bags",
    },
    {
      label: "FOOTWEAR",
      icon: "👠",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/21501264/zoom_0-1724738123.jpg",
      link: "/footwear",
    },
    {
      label: "ADD ONS",
      icon: "➕",
      imageLink:
        "https://n-img2.junaroad.com/stories/story_p_673c7f4d63d80c76353e980e-1732094289.jpeg",
      link: "/add-ons",
    },
    {
      label: "HOME",
      icon: "🏠",
      imageLink:
        "https://n-img0.junaroad.com/uiproducts/21547418/zoom_0-1727113737.jpg",
      link: "/home",
    },
    {
      label: "LINGERIE",
      icon: "👙",
      imageLink:
        "https://n-img2.junaroad.com/stories/story_p_673d5307fd3a0810afbd627d-1732162228.jpeg",
      link: "/lingerie",
    },
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
            <div>
              <img
                className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                src={category.imageLink}
                alt={`${category.label} icon`}
              />
              {/* {category.icon} */}
            </div>
            <span className="text-xs mt-2 font-dashboardLabel">
              {category.label}
            </span>
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
