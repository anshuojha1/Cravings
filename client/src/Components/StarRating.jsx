import React from "react";

export default function StarRating({ stars, size }) {
  const styles = {
    width: size + "px",
    height: size + "px",
    marginRight: size / 6 + "px",
  };
  function Star({ number }) {
    const halfNumber = number - 0.5;
    return stars >= number ? (
      <img className="mix-blend-darken" src="/star-full.svg" style={styles} alt={number} />
    ) : stars >= halfNumber ? (
      <img className="mix-blend-darken" src="/star-half.svg" style={styles} alt={number} />
    ) : (
      <img className="mix-blend-darken" src="/star-empty.svg" style={styles} alt={number} />
    );
  }
  return (
    <div className="flex flex-nowrap">
      {[1, 2, 3, 4, 5].map((number) => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
}
StarRating.defaultProps = {
  size: 18,
};
