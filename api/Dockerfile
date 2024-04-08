FROM python:3.9-slim
RUN groupadd -g 3030 python
RUN useradd --create-home --no-log-init -g 3030 python

USER python
ENV PATH="${PATH}:/home/python/.local/bin"
WORKDIR /app
RUN pip install --user pipenv

COPY Pipfile* .
RUN pipenv install --system --deploy