# 🌌 Astronomical Object Classification Using Machine Learning

## Exploring the Universe Through Data, Astronomy, and Artificial Intelligence

## ✨ Overview

This project is an **end-to-end Machine Learning application** for classifying celestial objects using the Sloan Digital Sky Survey (SDSS) dataset.

The application predicts whether an astronomical object is a:

- ⭐ Star
- 🌌 Galaxy
- ✨ Quasar (QSO)

The project covers the complete workflow from data preprocessing and model training to deployment using **FastAPI** and an interactive **HTML/CSS/JavaScript** web interface for real-time predictions.

---

## 🚀 Features

- End-to-End Machine Learning pipeline
- Exploratory Data Analysis (EDA)
- Data preprocessing and feature engineering
- Multiple ML model comparison
- Random Forest final model
- Model serialization with Joblib
- REST API using FastAPI
- Interactive web interface
- Real-time predictions

---

## 🎯 Project Goal

Build a reliable machine learning system capable of automatically classifying celestial objects from SDSS observations and deploy the trained model as a usable web application.

---

## 🔭 Dataset

Source: Sloan Digital Sky Survey (SDSS)

Target Classes:

| Class | Description |
|------|-------------|
| ⭐ STAR | Stellar objects |
| 🌌 GALAXY | Galaxies |
| ✨ QSO | Quasars |

Main Features:

- Right Ascension (RA)
- Declination (DEC)
- u, g, r, i, z magnitudes
- Redshift
- Plate
- MJD
- Fiber ID

---

## ⚙️ Machine Learning Pipeline

Raw Data

↓

EDA

↓

Data Cleaning

↓

Feature Engineering

↓

Train/Test Split

↓

Model Training

↓

Model Evaluation

↓

Model Serialization (Joblib)

↓

FastAPI REST API

↓

HTML/CSS/JavaScript Interface

↓

Real-Time Prediction

---

## 🤖 Models Evaluated

- Random Forest
- XGBoost
- Logistic Regression
- Support Vector Machine (SVM)
- K-Nearest Neighbors (KNN)

Random Forest achieved the best overall performance and was selected as the final deployed model.

---

## 🌐 Deployment

The trained model is deployed using FastAPI.

The front-end communicates with the REST API and returns predictions instantly.

Technologies:

- FastAPI
- Joblib
- HTML
- CSS
- JavaScript

---

## 🛠️ Technologies

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Scikit-Learn
- XGBoost
- FastAPI
- Joblib
- HTML
- CSS
- JavaScript
- Jupyter Notebook

---

## 📂 Project Structure

```text
Astronomical-Object-Classification/
│
├── api/
│   └── main.py
│
├── model/
│   ├── model.zip
│
├── web/
│   ├── index.html
│   ├── script.js
│   ├── scroll-effects.js
│   ├── skyfield.js
│   ├── style.css
│   └── three-scene.js
│
├── input/
│   └── star_classification.csv
│
├── classifier.ipynb
└── README.md
```

---

## 📦 Model Setup

The trained model is provided as **model.zip**.

1. Open the `model` directory.
2. Extract `model.zip`.
3. Ensure:

```text
model/
├── model.pkl
├── scaler.pkl
└── label_encoder.pkl
```

---

## ▶️ Running the Project

Run API

```bash
uvicorn api.main:app --reload
```

Open the web interface and start making predictions.

---

## 📸 Screenshots

Add screenshots of:

- Home Page
- Prediction Result
- API Response

---

## 🌠 Future Improvements

- Docker support
- Cloud deployment
- Explainable AI (SHAP)
- Model monitoring
- Responsive UI

---

## 💡 Conclusion

This project demonstrates a complete end-to-end Machine Learning workflow, transforming a trained astronomical classification model into a practical application through API deployment and a modern web interface.

---

## 📚 References

- Sloan Digital Sky Survey (SDSS)
- Scikit-Learn Documentation
- FastAPI Documentation

---

⭐ If you found this project useful, consider giving the repository a Star!
