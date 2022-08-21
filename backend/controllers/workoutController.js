const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workout
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({ createdAt: -1 })
    res.status(200).json({ status: "success", msg: "get all workout", data: workouts })
}

// get single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ status: "error", msg: "workout id error", data: "no such workout" })
    }
    const workout = await Workout.findById(id)
    if (!workout) { return res.status(404).json({ status: "error", msg: "workout id error", data: "no such workout" }) }
    res.status(200).json({ status: "success", msg: "get single workout", data: workout })

}

// create new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    const emptyFields = []
    if (!title) { emptyFields.push('title') }
    if (!reps) { emptyFields.push('reps') }
    if (!load) { emptyFields.push('load') }

    if (emptyFields.length > 0) {
        return res.status(400).json({status: 'error', msg:'Please fill in all the fields', data: emptyFields })
    }

    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json({ status: "success", msg: "create workout", data: workout })
    } catch (error) {
        res.status(400).json({ status: "error", msg: error.message })
    }
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ status: "error", msg: "workout id error", data: "no such workout" })
    }
    const workout = await Workout.findByIdAndDelete(id)
    if (!workout) { return res.status(404).json({ status: "error", msg: "workout id error", data: "no such workout" }) }
    res.status(200).json({ status: "success", msg: "deleted a workout", data: workout })
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ status: "error", msg: "workout id error", data: "no such workout" })
    }
    try {
        const workout = await Workout.findByIdAndUpdate(id, { ...req.body }, { new: true })
        if (!workout) { return res.status(404).json({ status: "error", msg: "workout id error", data: "no such workout" }) }
        res.status(200).json({ status: "success", msg: "updated a workout", data: workout })
    } catch (error) {
        res.status(400).json({ status: "error", msg: error.message })
    }
}

module.exports = { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout }