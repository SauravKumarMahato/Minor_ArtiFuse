import { useNavigate } from "react-router-dom";
import { Carousel } from 'flowbite-react';
import "./Navbar.css";
import first from "../../assets/images/first.png";
import second from "../../assets/images/second.png";
import third from "../../assets/images/third.png";
import four from "../../assets/images/four.png";
import fifth from "../../assets/images/fifth.png";
const LandingPage = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/inpainting');
    }

    return (
        <>
<h1 className="animated-heading">
                <span>A</span>
                <span>r</span>
                <span>t</span>
                <span>i</span>
                <span>F</span>
                <span>u</span>
                <span>s</span>
                <span>e</span>
            </h1>
            <div className="paragraph-text">
                  <p>Welcome to ArtiFuse, an image inpainting tool that utilizes advanced algorithms to seamlessly reconstruct missing or damaged portions of your images. By analyzing surrounding pixels and structures, it intelligently fills in the gaps, effectively restoring the visual integrity of the image. This versatile tool is invaluable for retouching photographs, removing unwanted objects, or repairing old and damaged images with precision and efficiency. </p>
                <p></p>
                </div>
                   <div>
                    <button onClick={handleClick} className="text-2xl mt-10 border-2 rounded-xl bg-blue-500 px-4 py-2">Image Inpainting</button>

                </div>

                

                    <div className="images">
                        <Carousel slide={false}>
                            <img src={third} alt="First" />
                            <img src={second} alt="..." />
                            <img src={first} alt="..." />
                            <img src={four} alt="..." />
                            <img src={fifth} alt="..." />
                        </Carousel>
                    

                
            </div>
        </>
    );
}


export default LandingPage;