import { useEffect, useState, useRef } from 'react';
import { FileInput, Label } from 'flowbite-react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import inpaintedImage from '../../../../api/generated_image.jpg'
import bgImage from '../../assets/images/background.jpeg'
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

const InpaintingPage = () => {
    const [brushSize, setBrushSize] = useState(5);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [drawingHistory, setDrawingHistory] = useState([]);
    const [outputImage, setOutputImage] = useState(false);
    const [loader, setLoader] = useState(false);

    const canvasRef = useRef(null);
    const navigate = useNavigate();

    // const inpaintedImage = "../../../../api/generated_image.jpg";

    useEffect(() => {
        if (selectedImage) {
            const canvas = canvasRef.current;

            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = selectedImage;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
        }
    }, [selectedImage]);

    const startDrawing = (event) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    };

    const endDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL('image/png');
        setDrawingHistory(prevHistory => [...prevHistory, imageData]);
    };

    const undoDrawing = () => {
        setDrawingHistory(prevHistory => {
            const updatedHistory = [...prevHistory];
            updatedHistory.pop();
            return updatedHistory;
        });
        redrawCanvas();
    };

    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // if (selectedImage) {
        const img = new Image();
        img.src = drawingHistory[drawingHistory.length - 1];
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        // }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const resizedImage = canvas.toDataURL('image/jpeg');
                    setSelectedImage(resizedImage);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReload = () => {
        setOutputImage(false);
        setSelectedImage(null);
        navigate('/inpainting');
    };

    const uploadImage = async () => {
        // Save the canvas drawing as an image
        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL('image/png');

        setOutputImage(false);
        // Send the image data to the backend
        if (imageData) {
            try {
                setLoader(true);
                await axios.post('http://127.0.0.1:8000/upload-image', {
                    image_url: imageData
                }).then((response) => {
                    setLoader(false);
                    console.log('image uploaded successfully:', response.data);
                    setOutputImage(true);
                })
                // Handle successful upload (e.g., clear form, display success message)
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle upload errors (e.g., display error message)
            }
        } else {
            console.log("No imageData found.");
        }
    }


    const downloadImage = () => {

        const link = document.createElement('a');
        link.href = inpaintedImage
        link.download = 'Inpainted_Image.jpg'
        link.click();
    }

    const backgroundStyles = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vh',
        height: '100vh',
        // You can add more styles as needed
    };

    return (
        <>
            <div className='font-sans'>

                <h1 className="text-4xl mb-10 mt-20 text-center ">Remove small deformities from your image</h1>
                <div className="flex gap-10 justify-center items-center">
                    <div className='border-2 border-gray-900  grid align-middle justify-center p-7'>
                        {selectedImage ? (
                            <div className="">
                                <div className="absolute top-0 right-0 p-2">
                                </div>
                                <div className="flex justify-center items-center mb-2">

                                    <canvas
                                        ref={canvasRef}
                                        className="cursor-pointer"
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={endDrawing}
                                        onMouseOut={endDrawing}
                                    ></canvas>
                                </div>
                                <div className='grid justify-center items-center'>

                                    <input
                                        type="range"
                                        className='mb-2 w-[25vh]'
                                        min="1"
                                        max="25"
                                        value={brushSize}
                                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                    />
                                    <label>Brush Size: {brushSize}</label>
                                </div>
                                <div className='flex gap-4 justify-center mt-4'>
                                    <button onClick={handleReload} className="border-2 rounded-xl bg-green-500 px-4 py-2">Re-Upload</button>
                                    <button onClick={uploadImage} className="border-2 rounded-xl bg-green-500 px-4 py-2">Fix Image</button>
                                    <button onClick={undoDrawing} className="border-2 rounded-xl bg-green-500 px-4 py-2">Undo</button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid w-full items-center justify-center">
                                <Label
                                    htmlFor="dropzone-file"
                                    className="hover:bg-blue-200 bg-gray-200 flex h-[40vh] w-[40vh] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg
                                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                    </div>
                                    <FileInput
                                        id="dropzone-file"
                                        className="hidden"
                                        type="file"
                                        onChange={handleFileUpload}
                                        accept="image/*"
                                    />
                                </Label>
                            </div>
                        )}
                    </div>
                    <div className='border-2 border-gray-900 grid w-[340px] h-[340px]  p-7'>
                        <div className="grid content-center justify-center ">
                            {/* Placeholder for Inpainted image */}


                            {loader
                                ? <Loader />
                                : (<img src={outputImage ? inpaintedImage : ""} width={150} height={150} alt="Ouput Image will be displayed here" />)
                            }
                            {outputImage ? (<button onClick={downloadImage} className="border-2 rounded-xl bg-green-500 px-4 py-2 mt-4">Download Image</button>) : (<div> </div>)}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>

    );
};

export default InpaintingPage;
