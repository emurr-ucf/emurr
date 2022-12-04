#!/bin/bash

# bash script can be added to the cron utility for scheduling tasks

echo "Updating repository at `date`"

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

git log -1 HEAD > diff2.txt

# compare the last commit to the previous comit
if cmp -s "./resources/diff.txt" "diff2.txt"
then
    echo "Files are the same"
    rm diff2.txt
    exit 1
else
    echo "Files are different"
    rm ./resources/diff.txt
    mv diff2.txt ./resources/diff.txt
fi

# Trigger installation of all modules listed as dependencies in the package.json
echo "Updating modules"
npm install

echo "Build Command"
npm run build
if [ $? -eq 0 ]
  then
    echo "SUCCESS"
  else
    echo "FAIL"
    exit 1
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