from PIL import Image
from numpy import asarray
image_horizontal=128
image_vertical=128

import os
import cv2
import numpy as np
from keras.models import load_model
from numpy.random import randint


def load_and_resize_images(folder_path, target_size=(image_horizontal, image_vertical)):
    images_list = []
    for filename in os.listdir(folder_path):
        # Check if the file is an image file
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            file_path = os.path.join(folder_path, filename)
            try:
                # Open the image file
                img = Image.open(file_path)
                # Resize the image
                img_resized = img.resize(target_size)
                # Convert image to array
                img_array = np.array(img_resized)
                # Append the image array to the list
                images_list.append(img_array)
            except Exception as e:
                print(f"Error loading {filename}: {e}")
    return asarray(images_list)

# Example usage
folder_path = "./uploads"
images = load_and_resize_images(folder_path)

# Check the number of images loaded
print(f"Number of images loaded: {len(images)}")

print('Loaded: ', images.shape)

model = load_model('./Model.h5')

def preprocess_data(data):
    # load compressed arrays
    # unpack arrays
    X1 = data[0]
    # scale from [0,255] to [-1,1]
    X1 = (X1 - 127.5) / 127.5

    return [X1, ]

# Assuming you have defined `images` variable with your image data
data = [images, ]

testing_dataset = preprocess_data(data)

[X1, ] = testing_dataset
# select random example
ix = randint(0, len(X1), 1)
image = X1[ix]
# generate image from source
gen_image = model.predict(image)
# plot_images(image, gen_image)

# Ask user if they want to save the generated image in JPG format
save_as_jpg = True

if save_as_jpg == True:
    # Convert the generated image to JPG format
    gen_image_jpg = ((gen_image[0] + 1) * 127.5).astype(np.uint8)  # Rescale and convert to uint8
    # Rearrange channels from BGR to RGB
    gen_image_jpg = cv2.cvtColor(gen_image_jpg, cv2.COLOR_BGR2RGB)
    cv2.imwrite("generated_image.jpg", gen_image_jpg)  # Save the image as JPG

    print("Generated image saved as 'generated_image.jpg'")
else:
    print("Invalid input. Please enter 'yes' or 'no'.")
