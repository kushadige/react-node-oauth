import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GithubContext from '../context/GithubContext';
import Spinner from '../components/layout/Spinner';
import PieChart from '../components/PieChart';

function Project(){

    const { user, repo, isLoading } = useContext(GithubContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user)
            navigate('/');
    }, [user]);

    return isLoading ? <Spinner /> : repo && (
        <>
            <div className='mx-auto text-center' style={{color: '#333'}}>
                <h1>{repo.name}</h1>
                <small>id: {repo.uid}</small>
            </div>
            <PieChart platforms={repo.platforms} />
            <ul className='container text-center list-unstyled'>
                <div className="row justify-content-md-center" style={{fontWeight: '500', color: '#333', fontSize: '1.1rem'}}>
                    <div className="col">
                        <li>Owner ID: {repo.owner}</li>    
                    </div>
                    <div className="col-md-auto">
                        <li>Size: {repo.size} KB</li>
                    </div>
                    <div className="col">
                        <li>Analysis time: {repo.duration}ms</li>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default Project;