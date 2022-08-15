import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GithubContext from '../context/GithubContext';

function ProjectItem({project, idx}){

    const { setRepo, analyzeStatus, setAnalyzeStatus, setIsLoading } = useContext(GithubContext);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('values', JSON.stringify(analyzeStatus));
    }, [analyzeStatus]);

    // Analyze button triggered
    const handleClick = async(e) => {
        setIsLoading(true);
        const cloneUrl = e.target.nextElementSibling.getAttribute('href') + '.git';
        
        if(!analyzeStatus[project.id]){
            const date = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
            setAnalyzeStatus({...analyzeStatus, [project.id]: {analysisDate: `${date}`}});
        }

        const res = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: cloneUrl})
        }).catch(() => setIsLoading(false));

        if(res.status === 200) {
            const data = await res.json();
            setRepo(data);
            
            navigate(`/project/${e.target.previousElementSibling.innerText}`);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            return;
        }
    }

    return(
        <div className="card p-2">
            <div className="card-body position-relative">
                <h4 className="card-title mb-3">{project.name}</h4>
                <button onClick={handleClick} className="btn btn-warning btn-sm mx-1">{analyzeStatus[project.id] ? 'Overview Repo' : 'Analyze Repo'}</button>
                <a href={project.html_url} target='_blank' className="btn btn-dark btn-sm mx-1">GitHub Link</a>
                
                <p className='position-absolute top-0 end-0 p-3 px-4 text-secondary'>{analyzeStatus[project.id] ?  `analysis date: ${analyzeStatus[project.id].analysisDate}` : 'not analyzed'}</p>
            </div>
        </div>
        
    );
}

export default ProjectItem;