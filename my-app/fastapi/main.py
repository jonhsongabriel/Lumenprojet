from fastapi import FastAPI
app = FastAPI()

@app.get("/api-fastapi/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}
