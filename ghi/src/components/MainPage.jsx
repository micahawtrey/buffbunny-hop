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
        color: 'lightgreen',
        textShadow: "3px 3px 3px black"
    };

    const camoButtonStyle = {
        background: 'url(https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71mWIV3jo1L._AC_UF894%2C1000_QL80_.jpg&tbnid=Tsvtch_rDp6zzM&vet=12ahUKEwjggP-0yfSEAxU3K2IAHcSmAwkQMygGegUIARD_AQ..i&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FWindham-Fabrics-0295842-Green-Fabric%2Fdp%2FB01B50CRWC&docid=hiOizd1kwso6QM&w=894&h=894&q=military%20camo&hl=en&ved=2ahUKEwjggP-0yfSEAxU3K2IAHcSmAwkQMygGegUIARD_AQ) repeat',
        color: 'lightgreen',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textShadow: '3px 3px 3px black'
    };

    return (
        <ExplodeOnClick>
            <div className="container" style={containerStyle}>
                <div className="content">
                    <h1>Buffbunny Hop</h1>
                    <h2>From Fluff To Buff</h2>
                </div>
                <div className="buttons-wrapper">
                    <Link to="/login" className="btn btn-primary" style={camoButtonStyle}>
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-secondary camo-button" style={camoButtonStyle}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </ExplodeOnClick>
    );
};

export default Main;
