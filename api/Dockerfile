FROM python:3.6

MAINTAINER Jorge Melgarejo <melgarejo.colarte@gmail.com>

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /api

WORKDIR /api

COPY requeriments.txt /api/

RUN pip install -r requeriments.txt

COPY . /api
