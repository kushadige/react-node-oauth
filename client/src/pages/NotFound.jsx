import { useContext, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import GithubContext from '../context/GithubContext';

function NotFound() {

    const { user } = useContext(GithubContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user)
            navigate('/profile');
    }, [user]);

    return (
        <div className='h-100 d-flex flex-column justify-content-center'>
            <div className="text-center hero-content">
                <div className="max-w-lg">
                    <h1 className='text-8xl font-bold mb-8'>
                        Oops!
                    </h1>
                    <p className='text-5xl mb-8'>404 - Not found!</p>
                    <Link to='/' className='btn btn-primary btn-lg'>
                        <FaHome className='mr-2' />
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;