import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GithubContext from '../../context/GithubContext';

function Header(){

    const navigate = useNavigate();
    const { user, setUser } = useContext(GithubContext);

    const logout = async() => {
        const res = await fetch('http://localhost:5000/logout');
        const data = await res.json();
        if(data.message){
            setUser();
            navigate('/');
        }
    }

    return(
        <header className="py-2" style={{backgroundColor: '#212529'}}>
            {user && (
                <div className='w-100 d-flex justify-content-between'>
                    <Link to='/' className="btn text-light mx-3">Home</Link>
                    <button onClick={logout} type="button" className="btn btn-light mx-3">Logout</button>
                </div>
            )}
        </header>
    )
}

export default Header;