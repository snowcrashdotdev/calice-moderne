FROM python:3.13-slim

WORKDIR /src

COPY ./requirements.txt /src/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

COPY ./calice /src/calice

CMD ["fastapi", "dev", "calice/main.py", "--port", "80", "--host", "0.0.0.0"]