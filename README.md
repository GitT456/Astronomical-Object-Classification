
---

### START OF README.md

# 🌌 Astronomical Object Classification Using Machine Learning

### Exploring the Universe Through Data, Astronomy, and Artificial Intelligence

---

## ✨ Overview

For thousands of years, humanity has observed the night sky, striving to understand countless celestial objects. Ancient astronomers relied on visual observation and imagination. Today, modern sky surveys generate massive datasets that demand automated analysis.

This project demonstrates how **Machine Learning** can classify celestial objects into:

- ⭐ **Stars**
- 🌌 **Galaxies**
- ✨ **Quasars (QSOs)**

using real observational data from the **Sloan Digital Sky Survey (SDSS)**.

---

## 🎯 Project Goal

The goal is to build and compare multiple ML models to accurately classify astronomical objects based on their physical and spectroscopic properties. By analysing features such as brightness and redshift, the models learn to distinguish between different celestial bodies.

---

## 🔭 About the Dataset

The dataset originates from the **Sloan Digital Sky Survey (SDSS)** – one of the largest and most comprehensive astronomical surveys ever conducted.

### 📊 Dataset Statistics

- **~100,000 observations**
- **3 target classes**
- Multiple photometric & spectroscopic features
- Real‑world astronomical measurements

### 🪐 Target Classes

| Class | Description |
|-------|-------------|
| ⭐ **STAR** | Stellar objects within galaxies |
| 🌌 **GALAXY** | Massive systems containing billions of stars |
| ✨ **QSO** | Quasi‑Stellar Objects (quasars) – extremely luminous active galactic nuclei |

### 🛰️ Features

| Feature | Description |
|---------|-------------|
| `RA` | Right Ascension (celestial longitude) |
| `DEC` | Declination (celestial latitude) |
| `u` | Ultraviolet brightness |
| `g` | Green band brightness |
| `r` | Red band brightness |
| `i` | Near‑infrared brightness |
| `z` | Infrared brightness |
| `redshift` | Distance and motion indicator |
| `plate` | Spectroscopic plate ID |
| `MJD` | Observation date |
| `fiber_ID` | Spectroscopic fibre ID |

### 🔥 Why Redshift Matters

Redshift is one of the most critical astronomical features. As objects move farther away, their light shifts towards the red end of the spectrum. It helps determine:

- Distance from Earth
- Relative motion
- Expansion of the cosmos

---

## ⚙️ Machine Learning Pipeline

Raw Data → EDA → Data Cleaning → Feature Engineering → Train‑Test Split → Feature Scaling → Model Training → Evaluation → Model Comparison

`

---

## 🤖 Applied Models

| Model |Random Forest------|-------------|
| 🌲 **Random Forest** | Ensemble of decision trees – imXGBoostracy, reduces overfitting |
| 🚀 **XGBoost** | Powerful gradient bLogistic Regression competitions |
| 📈 **Logistic Regression** | SiSupport Vector Machine (SVM)fier |
| 📐 **Support Vector Machine (SVM)** | Robust clK‑Nearest Neighbors (KNN) spaces |
| 👥 **K‑Nearest Neighbors (KNN)** | Distance‑based algorithm – classifies by nearest neighbours |

---

## 📊 Exploratory Data Analysis

Key analyses performed:

- Class distribution visualisation
- Feature histograms
- Redshift distribution analysis
- Correlation heatmap
- Feature importance ranking
- Confusion matrices
- Cross‑validation results

---

## 📏 Evaluation Metrics

- Accuracy
- Precision
- Recall
- F1‑score
- Confusion Matrix
- Cross‑validation (k‑fold)

---

## 🏆 Results

Tree‑based models (Random Forest and XGBoost) achieved the best performance, thanks to their ability to capture complex non‑linear patterns in astronomical data.

Overall, the results highlight the strong potential of Machine Learning for automating celestial object classification.

---

## 🛠️ Technologies Used

- Python – core programming language
- Pandas, NumPy – data manipulation and analysis
- Matplotlib, Seaborn – data visualisation
- Scikit‑Learn – model building and evaluation
- XGBoost – gradient boosting implementation
- Jupyter Notebook – interactive development environment

---

## 📂 Project Structure

```text
Astronomical-Object-Classification/
│
├── input/
│   └── star_classification.csv
│
├── SDSS_Classification.ipynb
│ 
└── README.md
```
---

## 🌠 Future Improvements

- Hyperparameter optimisation (GridSearch / RandomSearch)
- PCA & dimensionality reduction
- Advanced ensemble methods (Stacking, Voting)
- Deep learning models (CNNs, MLPs)
- Automated discovery systems for astronomical transients

---

## 💡 Conclusion

What once required years of manual observation can now be achieved in seconds with Machine Learning. This project sits at the intersection of Astronomy, Data Science, and Artificial Intelligence, demonstrating how modern algorithms help us better understand the universe.

---

> 🌌 *“Every point of light in the night sky tells a story. Machine Learning helps us read it.”*

### END OF README.md
