import React from "react";
import {Link} from "react-router-dom";
import "../css/ErrorPage.css"

const Home = () =>
{
    return(
        <div>
            <h1 className="error-title">- ERROR: 404 -</h1>

            <h2 className="error">The page you have requested for is not found</h2>
            <h3 className="error-desc">
                Please go back to the home page or contact us at cantcontactus@gmail.com.
            </h3>

            <h2 className="error">- Go to Home -</h2>
            <div className="go-home">
                <Link className="error-home" to="/">
                    Home
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