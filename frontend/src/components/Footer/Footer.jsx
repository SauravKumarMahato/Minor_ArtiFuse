import { Link } from "react-router-dom";

const Footer = () => {

    return (

        <>
            <footer className="site-footer mt-6 font-sans">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-10 me-auto mb-4">
                            <h4 className="text-white text-xl mb-3 "><Link to="/" className="font-bold">Thank </Link>You for your support!</h4>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;