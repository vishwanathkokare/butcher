import React from 'react';
import { Link } from 'react-router-dom';

interface HomeBoxProps {
  Image: string;
  Name: string;
}

const HomeBox: React.FC<HomeBoxProps> = ({ Image, Name }) => {
  const url = `/products/${Name}?image=${encodeURIComponent(Image)}`;

  return (
    <Link to={url} className="block cursor-pointer bg-white h-48 rounded-xl hover:scale-105 transition-transform
 shadow-lg overflow-hidden">
      <img src={Image} alt={Name} className="w-full h-3/4 object-contain"/>
      <div className="p-4 text-right">
        <h2 className="text-xl font-semibold text-gray-700">{Name}</h2>
      </div>
    </Link>
  );
}

export default HomeBox;