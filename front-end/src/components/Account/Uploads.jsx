


const Uploads = () => {
    return ( 
    <div>
        <form method="POST" action="/upload" encType="multipart/from-data">
            <input type="file" name="image" />
            <input type="submit" />
        </form>
    </div> 
    );
}
 
export default Uploads;