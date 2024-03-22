import { Link } from 'react-router-dom';
import ExplodeOnClick from './ExplodeOnClick';
import '../styles.css';
import buffBunnyLogo from './BUFFBunny_Hop_Logo-nobg.png';

const Main = () => {
    const containerStyle = {
        backgroundImage: `url(${buffBunnyLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
        textShadow: "3px 3px 3px rgba(0, 0, 0, 0.5)",
    };

    const headerStyle = {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    };

    const buttonStyle = {
        background: 'rgba(30, 30, 30, 0.8)',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)',
    };

    return (
        <ExplodeOnClick>
            <div className="container" style={containerStyle}>
                <div className="content">
                    <h1 style={headerStyle}>Buffbunny Hop</h1>
                    <h2 style={headerStyle}>From Fluff To Buff</h2>
                </div>
                <div className="buttons-wrapper">
                    <Link to="/login" className="btn btn-primary" style={buttonStyle}>
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-secondary camo-button" style={buttonStyle}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </ExplodeOnClick>
    );
};

export default Main;
