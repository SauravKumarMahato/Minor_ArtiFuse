# Setup for Image Inpainting with GAN

## 🔗 Pretrained Models (Generator & Discriminator)

To achieve high-quality image restoration, we utilize pretrained Generator and Discriminator models. You can download them from Google Drive:
[Download Models Here](https://drive.google.com/drive/folders/1WsPnQztd-It34YWdiGAIMEihXENYfQ3T?usp=drive_link)

The Discriminator model can be further used to refine the Generator model, making it more effective for training and improving restoration results.

### 📂 Organizing the Downloaded Models
Ensure that the downloaded models are placed in the following directory structure before running the application:
```
Minor_ArtiFuse/
│── frontend/
│── api/
│   ├── model/
│   │   ├── generator_model.h5
│   │   ├── discriminator_model.h5
```
Placing the models correctly ensures seamless execution of the restoration process.

## 🚀 Getting Started with the Frontend

Follow these steps to set up and run the frontend of the application:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SauravKumarMahato/Minor_ArtiFuse.git
   ```
2. **Navigate to the frontend directory:**
   ```bash
   cd Minor_ArtiFuse/frontend
   ```
3. **Install required dependencies:**
   ```bash
   yarn install
   ```
4. **Run the frontend server:**
   ```bash
   yarn run dev
   ```
5. **Access the application:**
   Open your browser and visit:
   ```bash
   http://localhost:5173/
   ```
Enjoy seamless image restoration powered by GANs!

## 📜 License
This project is licensed under the MIT License.

## 👨‍💻 Authors

- [Rajesh Adhikari](https://github.com/rajesh-adk-137)
- [Sandhya Baral](https://github.com/Sandukkk)
- [Saurav Kumar Mahato](https://github.com/SauravKumarMahato)

