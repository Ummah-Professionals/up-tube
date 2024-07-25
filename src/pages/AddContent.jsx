import { Link } from "react-router-dom";

export const AddContent = () => {

    const submitContent = async (event) => {

        event.preventDefault();

        const title = document.getElementById('videoTitle').value;
        const description = document.getElementById('videoDescription').value;
        const videoFile = document.getElementById('videoFile').files[0];

        if (!videoFile) {
            alert('Please select a video file.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoBlob', videoFile);

        try {
            const response = await fetch('http://localhost:3000/videos', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Video uploaded successfully!');
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Error uploading video.');
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('addVideoForm');
        if (form) {
            form.addEventListener('submit', submitContent);
            console.log("done");

        }
    });


        
    return (
        <main>
            <h1>Add Videos</h1>
            <form id="addVideoForm">
                <label>Title:</label>
                <br></br>
                <input type="text" id="videoTitle" name="videoTitle" required />
                <br></br>

                <label>Description:</label>
                <br></br>
                <textarea id="videoDescription" name="videoDescription" required></textarea>
                <br></br>

                <label>Upload Video:</label>
                <br></br>
                <input type="file" id="videoFile" name="videoFile" accept="video/*" required />
                <br></br>
                <br></br>

                <button type="submit" id="submit">Submit</button>
                <br></br>
                </form>
                <br></br>

            <Link to="/">Go to Home page</Link>
            <br></br>
            <br></br>
            <Link to="/about">Go to About page</Link>
        </main>
    );

}