import { useEffect, useState, useRef } from 'react';
import { FileInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const InpaintingPage = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [brushSize, setBrushSize] = useState(10);
    // const [reUpload, setReupload ] = useState(True)
    const canvasRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (imageUrl) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
        }
    }, [imageUrl]);

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    };

    const navigate = useNavigate();

    return (
        <>
            <h1 className="animated-heading">
           
                <span>Remove</span>
              
                <span> </span>
                <span>Deformities</span>
                <span> </span>
                <span>Here!</span>                       
            
            </h1>

            <div className="flex gap-10">
                <div className='border-2 border-gray-900 w-[55vh] h-[55vh] grid align-middle justify-center p-8'>
                    {imageUrl ? (
                        <div className="">

                            <div className="absolute top-0 right-0 p-2">
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={brushSize}
                                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                />
                                <label>Brush Size: {brushSize}</label>
                            </div>
                            <canvas
                                ref={canvasRef}
                                className="cursor-pointer w-[40vh] h-[40vh]"
                                onClick={handleCanvasClick}
                            ></canvas>

                            <div className='flex gap-4 justify-center'>
                                <button onClick={()=> {}} className="text-2xl mt-10 border-2 rounded-xl bg-green-500 px-4 py-2">Re-Upload</button>
                                <button className="text-2xl mt-10 border-2 rounded-xl bg-green-500 px-5 py-2">Mask</button>
                                <button className="text-2xl mt-10 border-2 rounded-xl bg-green-500 px-5 py-2">Undo</button>
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
