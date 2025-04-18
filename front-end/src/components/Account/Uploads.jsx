


const Uploads = () => {
    return ( 
    <div>
        <form method="POST"  encType="multipart/from-data">
            <input type="file" name="image" />
            <input type="submit" />
        </form>
    </div> 
    );
}
 
export default Uploads;