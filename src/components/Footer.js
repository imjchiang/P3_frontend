import React from "react";

const Footer = () =>
{
    return(
        <footer className="footer bg-dark">
            <div className="container text-center">
                <h6 className="text-muted footer-description">Developed and Produced by team reactiveMangos</h6>
                <h6 className="text-muted">@2020 Built with MERN</h6>

                <div className="footer-credits">
                    <div className="text-muted footer-section">
                        <h6 className="footer-bottom">- Meet the Developers -</h6>
                        <a className="bottom-content" href="https://github.com/imjchiang">@imjchiang</a>
                        <a className="bottom-content" href="https://github.com/akhuh213">@akhuh213</a>
                        <a className="bottom-content" href="https://github.com/ireneyap68">@ireneyap68</a>
                    </div>
                    <div className="text-muted footer-section">
                        <h6 className="footer-bottom">- Special Thanks -</h6>
                        <p className="bottom-content">The Instructional team of SEIR713</p>
                        <p className="bottom-content"></p>
                    </div>
                </div>
                
            </div>
        </footer>
    )
}

export default Footer;