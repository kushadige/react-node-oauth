import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Card from './shared/Card';

import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackItem({ item }){

    const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

    return(
        <AnimatePresence>
            <motion.div 
                key={item.id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Card>
                    <div className="num-display">{item.rating}</div>
                    <button onClick={() => deleteFeedback(item.id)} className='close'>
                        <FaTimes color='purple' />
                    </button>
                    <button onClick={() => editFeedback(item)} className='edit'>
                        <FaEdit color='purple' />
                    </button>
                    <div className="text-display">{item.text}</div>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default FeedbackItem;


// import { useState } from "react";

// const [rating, setRating] = useState(item.rating);
// const [text, setText] = useState(item.text);

// const handleClick = () => {
//     setRating((prev) => {
//         return prev + 1;
//     });
// }
// <button onClick={handleClick}>Click</button> 