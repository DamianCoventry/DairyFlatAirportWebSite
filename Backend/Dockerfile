FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /usr/app

COPY . /usr/app

RUN python -m pip install --upgrade pip
RUN python -m pip install -r requirements.txt
RUN chmod +x /usr/app/entrypoint.sh

EXPOSE 8000

CMD [ "./entrypoint.sh" ]
