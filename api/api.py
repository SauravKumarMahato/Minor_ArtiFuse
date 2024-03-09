from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os   

from pydantic import BaseModel
import base64


from PIL import Image
from numpy import asarray
import cv2
import numpy as np
from keras.models import load_model
from numpy.random import randint
from keras.preprocessing.image import img_to_array, load_img

image_horizontal=128
image_vertical=128


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


class ImageBaseModel(BaseModel):
    image_url: str

def load_and_resize_images(folder_path, size=(image_horizontal, image_vertical)):
    src_list = []
    for filename in os.listdir(folder_path):
      masked_img_path = os.path.join(folder_path, filename)
      masked_pixels = load_img(masked_img_path, target_size=size)
      masked_pixels = img_to_array(masked_pixels)
      src_list.append(masked_pixels)

    src_image=asarray(src_list)
    return src_image

def preprocess_data(data):
    # load compressed arrays
    # unpack arrays
    X1 = data[0]
    # scale from [0,255] to [-1,1]
    X1 = (X1 - 127.5) / 127.5
    return [X1, ]


def get_inpainted_image():
    folder_path = "./uploads"
    # Example usage
    images = load_and_resize_images(folder_path)

    # Check the number of images loaded
    print(f"Number of images loaded: {len(images)}")
    print('Loaded: ', images.shape)

    model = load_model('./model/Model.h5')

    # Assuming you have defined `images` variable with your image data
    data = [images, ]

    testing_dataset = preprocess_data(data)

    [X1, ] = testing_dataset
    # select random example
    ix = randint(0, len(X1), 1)
    image = X1[ix]

    # Ensure image has only 3 channels (RGB)
    image = image[..., :3]  # Keep only the first three channels

    # generate image from source
    gen_image = model.predict(image)
    # plot_images(image, gen_image)

    # Ask user if they want to save the generated image in JPG format
    save_as_jpg = True

    if save_as_jpg:
        # Specify the folder path where you want to save the image
        save_folder = "./"

        # Convert the generated image to JPG format
        gen_image_jpg = ((gen_image[0] + 1) * 127.5).astype(np.uint8)  # Rescale and convert to uint8
        # Rearrange channels from BGR to RGB
        gen_image_jpg = cv2.cvtColor(gen_image_jpg, cv2.COLOR_BGR2RGB)

        # Construct the full file path including the folder and file name
        save_path = os.path.join(save_folder, "generated_image.jpg")

        # Check if the file already exists
        if os.path.exists(save_path):
            os.remove(save_path)  # Remove the existing file

        # Save the image as JPG
        cv2.imwrite(save_path, gen_image_jpg)

        print(f"Generated image saved as '{save_path}'")
    else:
        print("Invalid input. Please enter 'yes' or 'no'.")





@app.post("/upload-image")
async def upload_image(image: ImageBaseModel):
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

        get_inpainted_image()
        return {"message": "Image uploaded successfully!"}


    except Exception as e:
        print("error occured")
        return JSONResponse(status_code=500, content={"message": f"An error occurred: {str(e)}"})

# Run the FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)