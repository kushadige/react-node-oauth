import { FaGithub } from 'react-icons/fa';

function GitHub(){

    return(
        <div className="d-flex align-items-center justify-content-center h-100">
            <div className='text-center border-bottom border-top mw-100 p-5' style={{width: '300px', borderRadius: '35%'}}>
                <a href='http://localhost:5000/access/github' target='_blank' className='btn btn-dark btn-lg mb-2 shadow'>
                    <FaGithub size={60} />
                </a>
                <div>
                    <h1 className='my-0'>GitHub</h1>
                    <small>OAuth v2</small>
                </div>
            </div>
        </div>
    );
}

export default GitHub;