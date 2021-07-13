#!/bin/zsh

rootdir=$0:A:h:h 

# export the env variables to the local shell and overide the db command
set -o allexport
source $rootdir/envfile.dev
set +o allexport
export SQL_HOST=localhost

# set ip mapping for the docker machine so that it can go through localhost
# this command can fail if the mapping already done so just pipe true to not fail on source
vboxmanage controlvm default natpf1 "budgets_server,tcp,127.0.0.1,8000,,8000" || True


