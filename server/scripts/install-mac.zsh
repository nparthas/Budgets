#!/bin/zsh

set -euo pipefail # use x to print commands

rootdir=$0:A:h:h 
envdir=$rootdir/.env
python=$envdir/bin/python3
pip=$envdir/bin/pip
requirements=$rootdir/requirements.txt

echo "starting setup..."

echo "making .env dir..."
if [ ! -d $envdir ] 
then
    python3 -m venv $envdir
else
    echo "directory already exists, skipping..."
fi

echo "upgrading pip..."
$pip install --upgrade pip

echo "installing requirements..."
$pip install -r $requirements

echo "tapping mongodb server..."
brew tap mongodb/brew

echo "installing mongodb..."
brew install mongodb-community@4.4

echo "starting mongo server"
brew services start mongodb-community@4.4
dbrunning=$(brew services list | grep mongodb-community || true)
if [ -z $dbrunning ]
then
    echo "db is not in the list of brew services, please manually fix"
    brew services list
    exit 1
fi

echo "applying first time migrations"
$python manage.py migrate

echo "creating dummy user with super secret password"
$python manage.py createsuperuser --email admin@example.com --username admin


echo "...finished setup"
