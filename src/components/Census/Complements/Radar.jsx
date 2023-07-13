import React, { useEffect, useState } from 'react';
import './Radar.css';

const Radar = () => {
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      const newTarget = { x, y };
      setTargets(prevTargets => {
        const updatedTargets = [...prevTargets, newTarget];
        return updatedTargets.slice(Math.max(updatedTargets.length - 30, 0));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="radar-container">
      <div className="radar">
        {targets.map((target, index) => (
          <div
            key={index}
            className="blip"
            style={{ top: `${target.y}%`, left: `${target.x}%` }}
          />
        ))}
        <div className="wave" ></div>
        <div className="waveb"></div>
      </div>
    </div>
  );
};

export default Radar;
