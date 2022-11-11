#!/bin/bash

# bash script can be added to the cron utility for scheduling tasks

echo "Updating repository at `date`"

# Trigger installation of all modules listed as dependencies in the package.json
echo "Updating modules"
npm install

if [ -d ".git" ]
  then
    echo "Status"
    git status
    echo "Fetching"
    git fetch
    echo "Pulling"
    git pull
  else
    echo "Skipping because it doesn't look like it has a .git folder."
  fi

echo "Build Command"
npm run build
if [ $? -eq 0 ]
  then
    echo "SUCCESS"
  else
    echo "FAIL"
fi

# restart application in the background
pm2 restart emurr
if [ $? -eq 0 ]
  then
    echo "RESTART SUCCESS"
  else
    echo "RESTART FAIL. STARTING NEW PROCESS CALLED Emurr"
    pm2 stop all
    pm2 start npm --name "emurr" -- start
fi
