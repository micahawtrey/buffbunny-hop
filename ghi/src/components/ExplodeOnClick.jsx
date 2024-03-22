import './ExplodeOnClick.css';

const ExplodeOnClick = ({ children }) => {
  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    for (let i = 0; i < 5; i++) {
      const explosion = document.createElement('div');
      explosion.classList.add('explosion');
      explosion.style.left = `${x}px`;
      explosion.style.top = `${y}px`;
      document.body.appendChild(explosion);

      explosion.addEventListener('animationend', () => {
        explosion.remove();
      });
    }
  };

  return (
    <div className="explode-wrapper" onClick={handleClick}>
      {children}
    </div>
  );
};

export default ExplodeOnClick;
