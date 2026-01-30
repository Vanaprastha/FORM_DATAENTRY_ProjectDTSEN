from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"Status" : "Backend Fast API is Running"}


# @app.post("/coba")
# def callback():
#     return {"Message": "old"}


