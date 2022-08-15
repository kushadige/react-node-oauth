import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState(FeedbackData);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        /*
        const response = await fetch('/feedback?_sort=id&_order=desc');

        const data = await response.json();
        
        setFeedback(data);
        */
        setIsLoading(false);
    }

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){

            /*
            await fetch(`/feedback/${id}`, {
                method: 'DELETE'
            });
            */

            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    const addFeedback = async (newFeedback) => {

        /*
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        });

        const data = await response.json();
        */

        newFeedback.id = uuidv4(); //JSON SERVER CREATES ID AUTOMATICALLY LIKE THE MOST BACK-END/DATABASE SERVICE SO WE DONT NEED to CREATE id FROM uuid ANYMORE..
        
        setFeedback([newFeedback, ...feedback]);
    }

    const editFeedback = (item) => {
        setFeedbackEdit({item: item, edit: true});
    }

    const updateFeedback = async (id, updItem) => {
        /*
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, ...updItem })
        });

        const data = await response.json();
        */
        setFeedback(feedback.map((item) => {
            return item.id === id ? { ...updItem } : item;
        }));

        setFeedbackEdit({
            item: {},
            edit: false
        });
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}> 
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;