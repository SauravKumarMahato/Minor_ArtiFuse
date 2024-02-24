import { useEffect, useState, useRef } from 'react';
import { FileInput, Label } from 'flowbite-react';
import axios from 'axios';


const InpaintingPage = () => {
    // const [imageUrl, setImageUrl] = useState(null);
    const [brushSize, setBrushSize] = useState(10);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const canvasRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
  };

    // const handleFileUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImageUrl(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

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

    // const endDrawing = () => {
    //     setIsDrawing(false);
    // };

    const endDrawing = () => {
        setIsDrawing(false);

        // uploadImage();

    };


    const uploadImage = async () => {
        // Save the canvas drawing as an image
        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL('image/png');
    

        // Send the image data to the backend
        if (imageData) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/upload-image', {
                     image_url: imageData
                });
                console.log('image uploaded successfully:', response.data);
                // Handle successful upload (e.g., clear form, display success message)
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle upload errors (e.g., display error message)
            }
        } else {
            console.log("No imageData found.");
        }
    }
    

    return (
        <>

            <h1 className="text-4xl my-10">Remove small deformities in our image</h1>

            <div className="flex gap-10">
                <div className='border-2 border-gray-900 w-[45vh] h-[45vh] grid align-middle justify-center p-7'>
                    {selectedImage ? (
                        <div className="">

                            <div className="absolute top-0 right-0 p-2">

                            </div>
                            <canvas
                                ref={canvasRef}
                                className="cursor-pointer "
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={endDrawing}
                                onMouseOut={endDrawing}
                            ></canvas>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={brushSize}
                                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                            />
                            <label>Brush Size: {brushSize}</label>

                            <div className='flex gap-4 justify-center'>

                                <button onClick={() => { }} className="text-2xl border-2 rounded-xl bg-green-500 px-4 py-2">Re-Upload</button>
                                <button onClick={uploadImage} className="text-2xl  border-2 rounded-xl bg-green-500 px-4 py-2">Fix Image</button>
                                <button className="text-2xl  border-2 rounded-xl bg-green-500 px-4 py-2">Undo</button>
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
                <div>
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        {/* Placeholder for Inpainted image */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InpaintingPage;


// import React, { useState } from 'react';
// import axios from 'axios';

// function Inpainting() {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (e) => {
//     setSelectedImage(e.target.files[0]);
//   };

//   const handleInpainting = async () => {
//     const formData = new FormData();
//     formData.append('image', selectedImage);
//     console.log(selectedImage);

//     try {
//       const response = await axios.post('http://localhost:8000/upload-image', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Image uploaded successfully:', response.data);
//       // You can do something with the response here if needed
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <button onClick={handleInpainting}>Upload Image</button>
//     </div>
//   );
// }

// export default Inpainting;

