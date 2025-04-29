import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { address } from "../../../address"; //update address here
console.log('address =>', address);

function SingleUserAdmin({user, isAdmin}) {
    const [allId, setAllId] = useState(1)
    const navigate = useNavigate()

    // console.log('user id', user.id);
    
    // console.log('user log =>', user)
    // console.log('allId log => ', allId);
    
    async function deleteHandle() {
        try {
            const response = await fetch(`${address}/user/delete/${user.id}`, { //update address here
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            const result = await response.json()
            console.log('result => ', result)
            if(response.ok) {
                navigate("/account")
            } else {
                console.log("error", response)
                
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        async function fetchAllId(params) {
            const response = await fetch(`${address}/user/all/info`) //update address here
            const result = await response.json()
            const users = result.users
            setAllId(users.map(u => u.id))
        }
    fetchAllId()
    },[])

    return ( 
        
        <div>
            {/* { grab id of user and see if === to user array [2(deleted user)]} */}
            
            {!(user.id === allId[1])?
                <button onClick={deleteHandle} className=" bg-red-500">KILL THIS FUCKER!!!</button>
                :<div>grave site</div>
            
            }
        </div>
     );
}

export default SingleUserAdmin;