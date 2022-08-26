import React, { useEffect } from 'react'
import axios from 'axios'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'


require('dotenv').config();


const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const fetchWorkout = async () => {

    const res = await axios(process.env.REACT_APP_BASE_API_URL + '/api/workout', { headers: { Authorization: `Bearer ${user.token}` } })

    const json = res.data.data
    if (res.status === 200) {
      dispatch({ type: 'SET_WORKOUTS', payload: json })
    }
  }

  useEffect(() => {
    if (user) {
      console.log({ home: 'home', user });
      fetchWorkout()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workout">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home