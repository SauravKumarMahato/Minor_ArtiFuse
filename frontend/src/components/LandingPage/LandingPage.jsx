import { useNavigate } from "react-router-dom";
import './css/bootstrap-icons.css'
import './css/bootstrap.min.css'
import './css/slick.css'
import './css/tooplate-little-fashion.css'

import imageD from './images/slideshow/pexels-pixabay-265946.jpg'
import imageE from './images/slideshow/pexels-tirachard-kumtanom-733852.jpg'
import imageG from './images/slideshow/fifth.png'
import Footer from "../Footer/Footer";





const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/inpainting');
    }

    return (
        <>
            {/* <section className="preloader">
                <div className="spinner">
                    <span className="sk-inner-circle"></span>
                </div>
            </section> */}


            <main className="font-sans">

                <section className="slick-slideshow">

                    <div className="slick-custom">
                        <img src={imageE} className="img-fluid" alt="" />

                        <div className="slick-bottom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 col-10">
                                        <h1 className="font-bold text-5xl text-white mb-4 ">Inpaint on your Own</h1>

                                        {/* <a href="about.html" className="btn custom-btn">Paint Here!</a> */}
                                        <button className="btn custom-btn " onClick={handleClick} >Paint Here!</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>

                <section className="about section-padding mt-40">
                    <div className="container">
                        <div className="row">

                            <div className="col-12 text-center">
                                <h2 className="font-bold text-4xl mb-5 mt-12 ">Get started with Image <span>Inpainting</span></h2>
                            </div>

                            <div className="col-lg-2 col-12 mt-auto mb-auto">
                                <ul className="nav nav-pills mb-5 mx-auto justify-content-center align-items-center" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><span className="font-bold text-2xl">Introduction</span></button>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-lg-10 col-12">
                                <div className="tab-content mt-2" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                        <div className="row">
                                            <div className="col-lg-7 col-12">
                                                <img src={imageD} className="img-fluid" alt="" />
                                            </div>

                                            <div className="col-lg-5 col-12">
                                                <div className="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                                                    <h4 className="font-bold text-2xl mb-3 ">Correct your <br />Images ,<span>Protect</span> your memories</h4>
                                                    <p className=" text-justify">We understand the value of preserving precious memories captured in photographs. Whether it's an old family portrait, a cherished wedding snapshot, or a vintage photograph showing signs of wear and tear, we're here to help you restore and enhance those images through our advanced image inpainting service.</p>


                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="">
                    <div className="container-fluid p-0">
                        <div className="row align-items-center">

                            <div className="col-lg-6 col-12">
                                <img src={imageG} className="img-fluid" alt="" />
                            </div>

                            <div className="col-lg-6 col-12 front-product p-10">
                                <div className="px-5 py-5 py-lg-0 mb-4">

                                    <h2 className="font-bold text-3xl my-4 "><span>Our</span> Service</h2>

                                    <p className=" text-justify">Restore cherished memories with our damaged photo restoration service. Our expert team specializes in removing scratches, tears, and other imperfections, ensuring your photos remain pristine for years to come. Bid farewell to unwanted objects or distractions, maintaining the integrity of your original image. Alter or reconstruct backgrounds effortlessly , seamlessly blending removed portions for a flawless, natural-looking result.</p>


                                </div>
                            </div>

                        </div>
                    </div>
                </section>



            </main>

            <Footer />
        </>
    );
}

export default LandingPage;
