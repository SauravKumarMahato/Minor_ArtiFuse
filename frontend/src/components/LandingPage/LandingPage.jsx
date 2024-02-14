import { useNavigate } from "react-router-dom";
import { Carousel } from 'flowbite-react';


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

                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel slide={false}>
                            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                            <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                            <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                            <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                            <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                        </Carousel>
                    </div>

                </div>
            </div>
        </>
    );
}


export default LandingPage;