from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os


app = FastAPI(
    title="Astronomical Object Classification API",
    version="1.0"
)


app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


model = joblib.load(
    os.path.join(BASE_DIR, "../model/model.pkl")
)


scaler = joblib.load(
    os.path.join(BASE_DIR, "../model/scaler.pkl")
)


label_encoder = joblib.load(
    os.path.join(BASE_DIR, "../model/label_encoder.pkl")
)



@app.get("/")
def home():

    return {

        "message":
        "Astronomical Object Classification API is running!"

    }



class ObjectFeatures(BaseModel):

    alpha: float

    delta: float

    u: float

    g: float

    r: float

    i: float

    z: float

    redshift: float


@app.post("/predict")
def predict(data: ObjectFeatures):


    input_data = pd.DataFrame(
        [data.model_dump()]
    )



    input_scaled = scaler.transform(
        input_data
    )



    prediction = model.predict(
        input_scaled
    )



    probabilities = model.predict_proba(
        input_scaled
    )



    confidence = (
        probabilities.max() * 100
    )



    class_name = (
        label_encoder
        .inverse_transform(prediction)
    )



    return {

        "prediction":
        class_name[0],


        "confidence":
        round(float(confidence),2)

    }