import { Link } from "react-router-dom";

export const ContactUs = () => {

    return (
        <main>
            <h1>Contact Us page</h1>

            <p>Email: uptube@gmail.com</p>

            <Link to="/">Go to Home page</Link> <br></br>
            <Link to="/about">Go to About page</Link>
        </main>
    );
}