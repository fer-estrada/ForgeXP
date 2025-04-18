import { useEffect, useState } from "react";

const Uploads = () => {
const [avatar, setAvatar] = useState();
const [error, setError] = useState();
console.log("useState image =>", avatar)


async function uploadHandle(e) {
    e.preventDefault()
    if(!avatar){
        return console.log("no file")
    }

    const formData = new FormData();
    formData.append("avatar", avatar)
    console.log("form data => ", formData)

    try {
        const response = await fetch("http://localhost:3000/user/avatar", {
            method: "POST",
            body: formData
        })

        console.log("fetch response =>", response)
    } catch (error) {
        console.log("try catch error => ", error)
    }
}



    return ( 
    <div>
        <h1>hello world</h1>
        <form method="POST" onSubmit={uploadHandle}  encType="multipart/from-data">
            <input type="file" accept="image/*" name="image" onChange={(e) => setAvatar(e.target.files[0])} />
            <input type="submit" />
        </form>
        <img src="http://localhost:3000/images/user-firelink_buddies.png" alt="no work :(" />
    </div> 
    );
}

export default Uploads;