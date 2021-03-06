import React, { useState } from 'react'
import { updateFellow } from './updateFellowSlice'
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UpdateFellows.css"




const UpdateFellow = () => {

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [newClass, setNewClass] = useState("")

    const dispatch = useDispatch()

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handleNewClassInput = (e) => {
        setNewClass(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await dispatch(updateFellow({
                email: email,
                newClass: newClass
            }))
            toast.success(`${email}'s class has been changed to ${newClass}`)
            setEmail("")
            setNewClass("")

        } catch (err) {
            toast.error(`Could not find fellow by email!`)
            setError(err.message)
        }
    }


    return (
        <div className="adminContainer" id="updateFellowDiv">
            <h1 id="updateFellowHeader">Update Fellow</h1>
            <form onSubmit={handleSubmit}>
                <div className="updateFellowLabelWrap">
                    <div className="updateFellowInfo">
                        <label className="updateFellowLabel">Fellow's Email</label>
                        <input className="updateFellowInput" type="text" placeholder="fellow@pursuit.org" value={email} onChange={handleEmailInput}/>
                    </div>
                </div>
                <div className="updateFellowLabelWrap">
                    <div className="updateFellowInfo">
                        <label className="updateFellowLabel">New Class</label>
                        <input className="updateFellowInput" type="text" placeholder="7.2" value={newClass} onChange={handleNewClassInput}/>
                    </div>
                </div>
                <button id="updateFellowButton">
                    Update Fellow
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default UpdateFellow;