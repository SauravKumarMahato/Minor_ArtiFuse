from fastapi import FastAPI, UploadFile, File
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os   

from fastapi.responses import JSONResponse
from pydantic import BaseModel
import base64
from uuid import uuid4


# # Create a list of allowed origins
# origins = ["http://localhost:5173"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# @app.post("/upload-video")
# async def upload_video(video: UploadFile = File(...)):
#     try:
#         content = await video.read()

#         # # Save the video file (replace with your desired logic)
#         # with open(f"uploads/{video.filename}", "wb") as f:
#         #     f.write(content)
#         print(video.filename)
#         return {"message": "Video uploaded successfully!"}

#     except Exception as e:
#         return {"message": f"An error occurred: {str(e)}"}

class Image(BaseModel):
    image_url: str

@app.post("/upload-image")
async def upload_image(image: Image):
    try:
        # print(f"The content of string is: {image.image_url}")
        
        # Remove the prefix
        cleaned_url = image.image_url.split(",")[1]
        # print(cleaned_url[:10])

        # Convert the base64 encoded image data to bytes
        image_bytes = base64.b64decode(cleaned_url)
        # print(image_bytes[:5])

        # Generate a unique filename for the image
        filename =  "input_image.png"
        
        # Path to the uploads folder
        upload_folder = "uploads"

        # Create the uploads folder if it doesn't exist
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        # Save the image file
        with open(os.path.join(upload_folder, filename), "wb") as f:
            f.write(image_bytes)
        return {"message": "Image uploaded successfully!"}

    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"An error occurred: {str(e)}"})

# Run the FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)