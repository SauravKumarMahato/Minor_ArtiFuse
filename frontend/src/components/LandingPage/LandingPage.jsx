import { useNavigate } from "react-router-dom";
import { Carousel } from 'flowbite-react';
import image1 from '../../assets/images/1.jpeg';
import image2 from '../../assets/images/2.jpeg'
import image3 from '../../assets/images/3.jpeg'
import image4 from '../../assets/images/4.jpeg'
import image5 from '../../assets/images/5.jpeg'

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/inpainting');
    }

    return (
        <>
            <h1 className="text-5xl my-10"> ArtiFuse</h1>

            <div className="grid grid-cols-2 gap-10">
                <div>
                    <h1 className="text-2xl text-left">Our image inpainting tool utilizes advanced algorithms to seamlessly reconstruct missing or damaged portions of images. By analyzing surrounding pixels and structures, it intelligently fills in the gaps, effectively restoring the visual integrity of the image. This versatile tool is invaluable for retouching photographs, removing unwanted objects, or repairing old and damaged images with precision and efficiency. </h1>
                    <button onClick={handleClick} className="text-2xl mt-10 border-2 rounded-xl bg-green-500 px-4 py-2">Image Inpainting</button>
                </div>
                <div>
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 border-2 rounded-md border-black">
                        <Carousel slide={true}>
                            <img src={image1} alt="..." />
                            <img src={image2} alt="..." />
                            <img src={image3} alt="..." />
                            <img src={image4} alt="..." />
                            <img src={image5} alt="..." />
                        </Carousel>
                    </div>
                </div>
            </div>  
        </>
    );
}

export default LandingPage;
