import React from 'react';

const BackgroundElements: React.FC = () => {
  const elements = [
    { id: 1, icon: 'fa-solid fa-file-word', color: 'text-blue-200', size: 'text-6xl', top: '10%', left: '5%', rotate: '-15deg', opacity: 'opacity-20' },
    { id: 2, icon: 'fa-solid fa-file-pdf', color: 'text-red-200', size: 'text-7xl', top: '40%', right: '10%', rotate: '25deg', opacity: 'opacity-15' },
    { id: 3, icon: 'fa-solid fa-file-alt', color: 'text-gray-200', size: 'text-5xl', bottom: '20%', left: '20%', rotate: '5deg', opacity: 'opacity-10' },
    { id: 4, icon: 'fa-solid fa-file-excel', color: 'text-green-200', size: 'text-6xl', top: '25%', left: '40%', rotate: '10deg', opacity: 'opacity-20' },
    { id: 5, icon: 'fa-solid fa-file-powerpoint', color: 'text-orange-200', size: 'text-7xl', bottom: '5%', right: '30%', rotate: '-30deg', opacity: 'opacity-15' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map(el => (
        <i
          key={el.id}
          className={`${el.icon} ${el.color} ${el.size} ${el.opacity} absolute`}
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            transform: `rotate(${el.rotate})`,
            zIndex: -10, // Assurez-vous qu'ils sont en arrière-plan
          }}
        ></i>
      ))}
    </div>
  );
};

export default BackgroundElements;