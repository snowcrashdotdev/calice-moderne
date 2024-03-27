FROM python:3.12-slim
ARG UID=1000
ARG GID=1000
RUN groupadd -g "${GID}" python \
  && useradd --create-home --no-log-init -u "${UID}" -g "${GID}" python

COPY ./requirements.txt .
RUN pip install -r requirements.txt

USER python
WORKDIR /app

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8000"]