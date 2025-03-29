import React from 'react';

const MenuItem = ({ title, description, prices }) => {
  return (
    <div className="producto">
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="precio">{prices}</p>
    </div>
  );
};

export default MenuItem;
