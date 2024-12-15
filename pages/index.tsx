import React from 'react';
import Slider from '@/components/Slider'; 
import CategoryList from '@/components/CategoryList'; 

const Home: React.FC = () => {
  return (
    <div>
      <Slider />
      <CategoryList />
    </div>
  );
};

export default Home;
