import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';
import Loader from './shared/Loader';

function FeedbackList(){
    const { feedback, isLoading } = useContext(FeedbackContext);

    if(!isLoading && (!feedback || feedback.length === 0)) {
        return <p>No Feedback Yet</p>
    }


    return isLoading ? <Loader /> : (
        <div className="feedback-list">
            
            {feedback.map((item) => {
                return (
                    <FeedbackItem 
                        item={item} 
                        key={item.id}
                    />
                );
            })}
        </div>
    );
}

// FeedbackList.propTypes = {
//     feedback: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.oneOfType([
//                 PropTypes.number,
//                 PropTypes.string
//             ]),
//             text: PropTypes.string.isRequired,
//             rating: PropTypes.number.isRequired
//         })
//     )
// }

export default FeedbackList;