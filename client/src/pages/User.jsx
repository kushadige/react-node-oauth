import { useContext, useEffect } from 'react';
import GithubContext from '../context/GithubContext';
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/layout/Spinner";
import ProjectItem from '../components/ProjectItem';
 
function User(){

    const { user, isLoading } = useContext(GithubContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user)
            navigate('/notfound');
    }, [user]);

    return(
        isLoading ? (<Spinner />) : user && (
        <div className='user d-flex p-5 mx-auto justify-content-evenly w-100'>
            <div className="profile" style={{width: '300px', maxWidth: '100%'}}>
                <img className='img-fluid w-100 rounded' src={user.avatarUrl} loading='lazy' />
                <h4 className='my-2' ><a className='text-decoration-none text-dark' target='_blank' href={user.projects[0].owner.html_url}>@{user.projects[0].owner.login}</a></h4>
                <div>
                    {user.bio && (`<p className='m-0'>bio: ${user.bio}</p>`)}
                    {user.email && (`<p className='m-0'>email: ${user.email}</p>`)}
                    {user.organizations.length > 0 && (<p className='m-0'>organizations: {user.organizations}</p>)}
                </div>
            </div>
            <div className="repos w-50">
                {user.projects.map((project, idx) => {
                    return <ProjectItem key={idx} project={project} />    
                })}
            </div>
        </div>)
    );
}

export default User;