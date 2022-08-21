import React from 'react'
import axios from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const handleClick = async (e) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/api/workout/${workout._id}`)
            if (res.status === 200) {
                dispatch({ type: 'DELETE_WORKOUT', payload: res.data.data })
            }
        } catch (error) {
            if (error.res.status === 400) {
                console.log(error.res.data.msg)
            }
        }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg) :</strong> {workout.loads}</p>
            <p><strong>Reps (kg) :</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span onClick={handleClick} className='material-symbols-outlined'>delete</span>
        </div>
    );
}

export default WorkoutDetails;