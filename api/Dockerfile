FROM python:3.9-slim
ARG UID=1000
ARG GID=1000
RUN groupadd -g "${GID}" python \
  && useradd --create-home --no-log-init -u "${UID}" -g "${GID}" python

USER python
ENV PATH="${PATH}:/home/python/.local/bin"
WORKDIR /app
RUN pip install --user pipenv

COPY Pipfile* .
RUN pipenv install

CMD ["pipenv", "run", "uvicorn", "index:app", "--app-dir=/app/api", "--host=0.0.0.0", "--port=8000", "--reload"]