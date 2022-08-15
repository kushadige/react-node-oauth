import { useParams, Navigate, useNavigate, Routes, Route } from 'react-router-dom';

function Post(){
    const status = 200;

    const params = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Hello');
        navigate('/about');
    }

    if(status === 404) {
        return <Navigate to='/notfound' />
    }

    return(
        <div>
            <Routes>
                <Route path='/*'
                    element={
                        <>
                            <h1>Post {params.id}</h1>
                            {/* <p>Name: {params.name}</p> */}
                            <button onClick={handleClick}>Click</button>
                        </>
                    } />
                <Route path='/show' element={<h1>Hello World</h1>} />
            </Routes>
        </div>
    );
}

export default Post;