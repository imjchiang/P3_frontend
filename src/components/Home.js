import React from "react";
import {Link} from "react-router-dom";

const Home = () =>
{
    return(
        <div>
            <h1>exitcodeZero</h1>
            <p>To ask questions on coding, debugging, and the theory behind coding and to help others in the community of coders that collectively ask, learn, and help.</p>
            <p>Create an account with us to have access to even more features...</p>
            <li>Ask Questions</li>
            <li>Create Solutions</li>
            <li>Promote Good Content</li>
            <h3>Explore Questions Now!!</h3>
            <Link to="/allPosts">
                <button>Let's Go</button>
            </Link>
        </div>
    )
}

export default Home;