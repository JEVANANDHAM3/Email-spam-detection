#server(Fast  api server)
from fastapi import FastAPI
import gc
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.tree import DecisionTreeClassifier
from contextlib import asynccontextmanager
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware

vectorise: TfidfVectorizer
decision_tree_model: DecisionTreeClassifier

@asynccontextmanager
async def life_cycle(app: FastAPI):
    global vectorise
    global decision_tree_model
    
    vectorise = joblib.load("./model/weights/dec_vectorizer.pkl")
    decision_tree_model = joblib.load("./model/weights/spam_detection_model.pkl")
    
    yield

    del decision_tree_model
    del vectorise
    gc.collect()

app = FastAPI(lifespan=life_cycle)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
async def root():
    return 'ML model Inference Server'

@app.post('/decision-tree')
async def decision_tree(request: Request):
    data = await request.json()
    mail_data = data.get("text")
    print(mail_data)
    vect_mail_data = vectorise.transform([str(mail_data)])

    prediction = decision_tree_model.predict(vect_mail_data)


    prediction_value = int(prediction[0])


    return {"prediction": prediction_value}
