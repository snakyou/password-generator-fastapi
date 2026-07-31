import secrets
import string
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

def generate_password(length: int, use_digits: bool, use_spec: bool) -> str:
    chars = string.ascii_letters
    if use_digits:
        chars += string.digits
    if use_spec:
        chars += "!@#$%^&*"
    return "".join(secrets.choice(chars) for _ in range(length))


@app.get("/api/generate")
def apt_generate(length: int = 12, digits: bool = True, spec: bool = True):
    password = generate_password(length, digits, spec)
    return {"password": password}


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)