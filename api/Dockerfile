FROM python:3.12-slim

WORKDIR /app
RUN pip install pipenv

COPY Pipfile* .
RUN pipenv update
RUN pipenv install --system --deploy