# Image Inpainting with GAN

## Description

We understand the value of preserving precious memories captured in photographs. Whether it's an old family portrait, a cherished wedding snapshot, or a vintage photograph showing signs of wear and tear, we're here to help you restore and enhance those images through our advanced image inpainting service.

Restore you images by removing scratches, tears, and other imperfections, ensuring your photos remain pristine for years to come. Bid farewell to unwanted objects or distractions, maintaining the integrity of your original image. Alter or reconstruct backgrounds effortlessly, seamlessly blending removed portions for a flawless, natural-looking result.

## Screenshots

<img src="screenshots/3.png" />
<img src="screenshots/4.png" />
<img src="screenshots/5.png" />
<img src="screenshots/1.png" />
<img src="screenshots/2.png" />


## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [License](#license)
- [Authors](#authors)

## Features

Helps remove small deformities present in you image.

## Demo

https://github.com/SauravKumarMahato/Minor_ArtiFuse/assets/89499267/41fe1778-5edd-4071-86df-f530227427f5

## Installation

1. Clone the repository:

```bash
https://github.com/SauravKumarMahato/Minor_ArtiFuse/
```

2. Install requirements.txt (required for backend, use venv or any other virtual environment)
```bash
pip install -r requirements.txt
```

3. Navigate to frontend folder 
```bash
yarn install 
```

4. Run frontend
```bash 
yarn run dev 
```

5. Open another terminal and run below in it. 
```bash 
cd api
python app.py 
```

6. Open browser and navigate to 
```bash 
http://localhost:5173/
```
#### Note: Since the inpainting model has size greater than 100MB permitted by Github to push so, it hasn't been uploaded. You can refer to this [README.md](./frontend/README.md) 

#### For data preprocessing(masking) and model code, refer the link provided below.
https://github.com/rajesh-adk-137/Minor_ArtiFuse_GAN_training

## License
This project is licensed under the MIT License.

## Authors
[Rajesh Adhikari](https://github.com/rajesh-adk-137)

[Sandhya Baral](https://github.com/Sandukkk)

[Saurav Kumar Mahato](https://github.com/SauravKumarMahato)

