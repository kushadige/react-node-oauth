import { useState, useEffect, useContext } from 'react';
import RatingSelect from './RatingSelect';
import Card from './shared/Card';
import Button from './shared/Button';

import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm(){
    const [formText, setFormText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [btnText, setBtnText] = useState('Send');

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDisabled(false);
            setFormText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
            setBtnText('Update');
        } else {
            setBtnText('Send');
        }
    }, [feedbackEdit]);

    const handleTextChange = (e) => {
        if(formText === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if(formText.trim().length <= 10 && formText !== '') {
            setBtnDisabled(true);
            setMessage('Feedback must be at least 10 characters');
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }

        setFormText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formText.trim().length <= 10){
            return;
        }

        const newFeedback = {
            text: formText,
            rating: rating
        }

        if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback);
        } else {
            addFeedback(newFeedback);
        }

        setFormText('');
        setRating(10);
    }

    const selectedRating = (rating) => {
        setRating(rating);
    }

    return(
        <div>
            <Card>
                <form onSubmit={handleSubmit}>
                    <h2>How would you rate your service with us</h2>
                    {/* @todo - rating select component */}
                    <RatingSelect selectedRating={selectedRating} />
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder='Write a review' 
                            value={formText}
                            onChange={handleTextChange} 
                        />
                        <Button version='secondary' type='submit' isDisabled={btnDisabled}>{btnText}</Button>
                    </div>

                    {message && <div className='message'>{message}</div>}
                </form>
            </Card>
        </div>
    );
}

export default FeedbackForm;