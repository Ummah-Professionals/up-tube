import { Link } from "react-router-dom";

export const AddContent = () => {

    document.getElementById('submit').addEventListener('click', () => {
        
        const title = document.getElementById('videoTitle').value;
        const description = document.getElementById('videoDescription').value;
        const videoBlob = document.getElementById('videoFile').value;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoBlob', videoBlob);

        const response = fetch('http://localhost:3000/videos', {
            method: 'POST',
            body: formData,
        });
        
        console.log(formData.title);

    })
        
    return (
        <main>
            <h1>Add Videos</h1>
            
                <label>Title:</label>
                <br></br>
                <input type="text" id="videoTitle" name="videoTitle" required />

                <label>Description:</label>
                <br></br>
                <textarea id="videoDescription" name="videoDescription" required></textarea>

                <label>Upload Video:</label>
                <br></br>
                <input type="file" id="videoFile" name="videoFile" accept="video/*" required />

                <button type="submit">Submit</button>

            <Link to="/">Go to Home page</Link>
            <br></br>
            <br></br>
            <Link to="/about">Go to About page</Link>
        </main>
    );

}