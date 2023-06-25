# syntax=docker/dockerfile:1

FROM python:3.11.4-alpine

WORKDIR /flask-react

COPY requirements.txt requirements.txt

RUN apk add --update \
    nodejs \
    npm \
    && pip install --upgrade pip \
    && pip install -r requirements.txt \
    && rm -rf /var/cache/apk/*

COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5000

CMD [ "python", "-m", "flask", "run"]