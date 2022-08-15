import { createContext, useEffect, useState } from 'react';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [repo, setRepo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [duration, setDuration] = useState(0);
    const [analyzeStatus, setAnalyzeStatus] = useState({});

    useEffect(() => {
        getUser();

        if(localStorage.getItem('values'))
            setAnalyzeStatus(JSON.parse(localStorage.getItem('values')));
            
    }, []);

    const getUser = async() => {
        const res = await fetch('http://localhost:5000/user');
        const data = await res.json();

        if(res.status === 200) {
            setUser(data);
        } else {
            return;
        }
    }

    return(
        <GithubContext.Provider value={{
            user,
            repo,
            duration,
            isLoading,
            setUser,
            setRepo,
            setDuration,
            setIsLoading,
            analyzeStatus,
            setAnalyzeStatus
        }}>
            {children}
        </GithubContext.Provider>
    );
}

export default GithubContext;