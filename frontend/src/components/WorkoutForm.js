import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import axios from 'axios'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps }
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_API_URL+'/api/workout', workout)
            if (response.status === 200) {
                setTitle('')
                setLoad('')
                setReps('')
                setError(null)
                setEmptyFields([])
                // console.log('new workout added', response.data.data)
                dispatch({type:'CREATE_WORKOUT', payload: response.data.data})
            }
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.msg)
                setEmptyFields(error.response.data.data)
            }
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new workout</h3>

            <label htmlFor="title">Excercize Title :</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} name="title" 
            className={emptyFields.includes('title')? 'error' : ''} />

            <label htmlFor="load">Load (in kg) :</label>
            <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} name="load" 
            className={emptyFields.includes('load')? 'error' : ''}/>

            <label htmlFor="reps">Reps (in kg) :</label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} name="reps" 
            className={emptyFields.includes('reps')? 'error' : ''}/>
            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}

export default WorkoutForm;