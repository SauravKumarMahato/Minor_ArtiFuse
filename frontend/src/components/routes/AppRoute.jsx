import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import InpaintingPage from "../InpaintingPage/InpaintingPage";

const AppRoute = () => {

    return (

        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/inpainting" element={<InpaintingPage />} />

                </Routes>
            </Router>
        </>
    );
}


export default AppRoute;