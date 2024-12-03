import './App.css';

import React from 'react';

import Card from './components/Card';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './pages/Admin/Dashboard';

const categories = [
  {
    id: "1",
    title: "WEDDING SEASONAL EXCEPTIONAL!",
    images: [
      "https://n-img1.junaroad.com/stories/story_p_673c8b49bec3da77ea2fce51-1732965811.jpeg",
    ],
    followers: "4k",
    likes: 5,
    itemsCount: 22,
  },
  {
    id: "2",
    title: "KEEP UP WITH THE CLASSICS",
    images: [
      "https://n-img2.junaroad.com/stories/story_p_673b083a4e6b0d1e9f0a5763-1732105460.jpeg",
    ],
    followers: "6k",
    likes: 10,
    itemsCount: 15,
  },
  {
    id: "3",
    title: "PERFECT FOR WEDDING GUESTS",
    images: [
      "https://n-img2.junaroad.com/stories/story_p_672cb20efd3a082a00df982e-1731759353.jpeg",
    ],
    followers: "5K",
    likes: 28,
    itemsCount: 17,
  },
  {
    id: "4",
    title: "SO PRETTY",
    images: [
      "https://n-img0.junaroad.com/stories/story_p_672d9e6830902859f2b92acb-1731834397.jpeg",
    ],
    followers: "5k",
    likes: 52,
    itemsCount: 17,
  },
  {
    id: "5",
    title: "NEW IN!",
    images: [
      "https://n-img4.junaroad.com/stories/story_p_672da05afd3a082a00e04d6f-1731315967.jpeg",
    ],
    followers: "9k",
    likes: 90,
    itemsCount: 17,
  },
  {
    id: "6",
    title: "WEDDING GLAM",
    images: [
      "https://n-img2.junaroad.com/stories/story_p_672dab05bec3da1167c20985-1732718360.jpeg",
    ],
    followers: "7k",
    likes: 78,
    itemsCount: 17,
  },
  {
    id: "7",
    title: "COP NOW",
    images: [
      "https://n-img3.junaroad.com/stories/story_p_673583da63d80c14a1378164-1732096943.jpeg",
    ],
    followers: "5k",
    likes: 14,
    itemsCount: 17,
  },
  {
    id: "8",
    title: "CART NOW",
    images: [
      "https://n-img1.junaroad.com/stories/story_p_67404ede4902357a28930ba5-1732514682.jpeg",
    ],
    followers: "2K",
    likes: 11,
    itemsCount: 17,
  },
  {
    id: "9",
    title: "COP MITHALI'S LOOK",
    images: [
      "https://n-img0.junaroad.com/stories/story_p_673ef598bec3da77ea31cf2b-1732270671.jpeg",
    ],
    followers: "10K",
    likes: 99,
    itemsCount: 17,
  },
  {
    id: "10",
    title: "WEAR YOUR HEART",
    images: [
      "https://n-img1.junaroad.com/stories/story_p_673c7f4d63d80c76353e980e-1732094289.jpeg",
    ],
    followers: "9K",
    likes: 76,
    itemsCount: 17,
  },
  {
    id: "11",
    title: "MAKE EVERY SECOND COUNT",
    images: [
      "https://n-img2.junaroad.com/stories/story_p_67346d0549023517bf12e609-1731492543.jpeg",
    ],
    followers: "25k",
    likes: 18,
    itemsCount: 17,
  },
  {
    id: "12",
    title: "SHOP ASAP",
    images: [
      "https://n-img4.junaroad.com/stories/story_p_673f108be2ca7b0eb775ea77-1732515688.jpeg",
    ],
    followers: "15k",
    likes: 12,
    itemsCount: 17,
  },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-100">
        {categories.map((category, index) => (
          <Card key={index} {...category} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default App;
