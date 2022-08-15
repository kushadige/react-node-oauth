import GitHub from "../components/GitHub";
import GithubContext from '../context/GithubContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
function Home(){

    const { user } = useContext(GithubContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user)
            navigate('/profile');
    }, [user]);

    return(
        <>
            <GitHub />
        </>
    );
}

export default Home;