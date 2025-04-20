// FIXME:
export default async function updateAvatar(id) {
    try {
        const response = await fetch(`http://localhost:3000/user/${id}/avatar`, {
            method: "PUT",
            body: {}
        })
        return await response.json
    } catch (error) {
        console.log(error)
    }
}

// TODO: Delete avatar function

// ? Maybe have all fetch functions in here (idea ?)