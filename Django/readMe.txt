Prerequesites:
- Installed Docker and docker-compose
- Have the Docker, vscode-database, and MySQL extensions

Steps
- After cloning from repo, create an python virtualenv named env here

e.g. File Structure after doing this
Django
|
|_ Ayo/
|
|_ env/


- cd into Ayo, then run docker-compose up, wait for it to finish
(if stuck in ayo_db, ctrl+C to exit then run again)

- Follow the steps which are similar to the tutorial video

- To read already saved data from the database, do
python manage.py loaddata db.json

- If you want to upload dummy data from your machine to git, do
python manage.py dumpdata > db.json


