#!/bin/bash

sleep 4

echo "Apply database migrations"
python3 manage.py migrate

echo "Starting server"
python3 manage.py runserver 0.0.0.0:9000
