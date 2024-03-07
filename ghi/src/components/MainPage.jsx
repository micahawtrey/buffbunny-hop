import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
// import GYM_ACCESS_KEY from '../api_keys';
// import '../styles.css';

function Main() {
  // const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // const fetchImage = async () => {
    //   try {
    //     const response = await fetch('https://api.pexels.com/v1/search?query=gym&per_page=10', {
    //       headers: {
    //         Authorization: `Bearer ${GYM_ACCESS_KEY}`,
    //       },
    //     });
    //     const data = await response.json();
    //     if (response.ok && data.photos && data.photos.length > 0) {
    //       const randomIndex = Math.floor(Math.random() * data.photos.length);
    //       setImageUrl(data.photos[randomIndex].src.medium);
    //     } else {
    //       console.error('Error fetching image:', data);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching image:', error);
    //   }
    // };

    // fetchImage();
  }, []);

  // Function to trigger explode animation
  // const explode = (element) => {
  //   element.classList.add('explode');
  //   setTimeout(() => {
  //     element.classList.remove('explode');
  //   }, 500); // Duration of the explode animation (in milliseconds)
  // };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col text-center mt-5">
          <h1>Buffbunny Hop</h1>
          <p>From Fluff to Buff</p>
          <div className="d-flex justify-content-center">
            <Link to="/login" className="btn btn-primary mx-2">Log In</Link>
            <Link to="/signup" className="btn btn-success mx-2">Sign Up</Link>
          </div>
          {/* {imageUrl && <img src={imageUrl} alt="Gym" className="explode-on-click" onClick={(e) => explode(e.target)} />} */}
        </div>
      </div>
    </div>
  );
}

export default Main;
