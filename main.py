from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import uvicorn


app = FastAPI()


class Item(BaseModel):

    name: str

    description: str | None = None

    price: float

    tax: float | None = None


@app.get("/hello")
def hello():
    return {"message": "안녕하세요 슈퍼코딩"}


@app.get("/answer")
def read_answer():
    return {"answer": "apple"}


@app.get("/items/{item_id}")
def read_item(item_id):
    return {"item_id": item_id}


fake_items_db = [{"item_name": "Foo"}, {
    "item_name": "Bar"}, {"item_name": "Baz"}]


@app.get("/items/")
def read_item(skip: int = 0, limit: int = 10):

    return fake_items_db[skip: skip + limit]


@app.post("/items/")
def create_item(item: Item):

    return item


app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == '__main__':

    uvicorn.run('main:app', port=8000, reload=True)
