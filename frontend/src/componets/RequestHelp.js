import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../util/apiURL';
import { AuthContext } from "../providers/AuthProvider";

export default function RequestHelp() {
    const [isLoading, setIsLoading] = useState(true)
    const [isWaitingForHelp, setIsWaitingForHelp] = useState(false);
    const [openTicket, setOpenTicket] = useState(null)
    const { token } = useContext(AuthContext);
    const API = apiURL();
    
    const fetchOpenTicket = async () => {
        try {
            let res = await axios({
                method: 'get', 
                url: `${API}/api/tickets/open_tickets/`,
                headers: {
                    'AuthToken': token
                }
            })
            if(res.data.openTicket.length) {
                setIsWaitingForHelp(true);
                setOpenTicket(res.data.openTicket[0])
            } else {
                setIsWaitingForHelp(false);
                setOpenTicket(null)
            }       
        } catch (error) {
            setIsWaitingForHelp(false);
            setOpenTicket(null)
        }
            
    }
    useEffect(() => {
        fetchOpenTicket().then(() => {
            setIsLoading(false)
        })
    }, [])

    const makeRequest = async () => {
        try {
            let res = await axios({
                method: 'post', 
                url: `${API}/api/tickets`,
                headers: {
                    'AuthToken': token
                },
                data: {
                    body: ""
                }
            })
            fetchOpenTicket()
        } catch (error) {
            fetchOpenTicket()
        }

    }

    const cancelRequest = async () => {
        try {
            let res = await axios({
                method: 'delete', 
                url: `${API}/api/tickets/close_tickets/${openTicket.id}`,
                headers: {
                    'AuthToken': token
                }
            })
            fetchOpenTicket()
        } catch (error) {
            fetchOpenTicket()
        }

    }
    if(isLoading) return null; 
    return(
        <div>
            {isWaitingForHelp ? 
            <button onClick={cancelRequest}>Cancel Request</button> 
            :
            <button onClick={makeRequest}>Request Help</button>
            }
        </div>
    )
};
