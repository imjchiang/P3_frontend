import React from "react";
import {Link} from "react-router-dom";
import "../css/Home.css"

const Home = () =>
{
    return(
        <div>
            <h1 className="title">- exitcodeZero -</h1>

            <h2>- Our Purpose -</h2>
            <h3 className="desc">
                To create a space for coders to ask questions on coding, debugging, and 
                the theory behind coding and to help one another in this unique and 
                special community of coders that collectively ask, learn, and help.
            </h3>

            <h2>- Why You Should Join -</h2>
            <h3 className="desc">
                Create an account with us to have access to even more features such as . . .
                <p className="first">{`>`} asking your own questions {`<`}</p>
                <p>{`>`} creating unique solutions {`<`}</p>
                <p>{`>`} promoting good and helpful content {`<`}</p>
            </h3>
            <h2>- Explore Your Questions Now -</h2>
            <div className="go-feed">
                <Link className="explore" to="/allPosts">
                    LET'S GO!
                </Link>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default Home;