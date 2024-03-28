FROM python:3.9-slim
ARG UID=1000
ARG GID=1000
RUN groupadd -g "${GID}" python \
  && useradd --create-home --no-log-init -u "${UID}" -g "${GID}" python

COPY requirements.txt .
RUN pip install -r requirements.txt

USER python
WORKDIR /app

CMD ["uvicorn", "index:app", "--host=0.0.0.0", "--port=8000", "--reload"]