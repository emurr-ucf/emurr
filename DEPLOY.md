## EMURR Team

1. Make sure to be connected to the UCF VPN before accessing the server.

2. Open a terminal and type `ssh [username]@chdr.cs.ucf.edu`
    - Note: all team members are part of the `emurr` group. Hence another way to access the server is:
  ssh emurr@chdr.cs.ucf.edu
    - You will be asked for a password: 
    
3. When you log in to CHDR cd to directory `cd /home/emurr/emurr` (1st emurr is for the group folder in CHDR and it cannot be modified, 2nd emurr is the name of our GitHub repo)

4. You may use `ls -l` to list all the files in the current dir including the hidden files

5. `git pull` the latest changes from `develop` branch in GitHub
    - Note 1: If you would, do `git status` and `git branch` to display the state of the current dir and make sure you are pulling from develop.
    - Note 2: Check the `.env` and `.env.local` files are in the root directory
    
6. Build the project by running `npm run build`. This will create a `.next` folder if the build is successful   

7. Our application is listening on port 4444 and the `package.json` file was modified to include this as shown below:

```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 4444",
    "lint": "next lint"
  },
  ```
  
 8. The server is ran using pm2, a process manager for production Node.js applications.
 
 9. Check the status by running `pm2 status` anywhere in the CHDR Server or run `pm2 -h` for a list of available commands
 
 10. Currently, there is a process running called `emurr` which should be restarted after each build `pm2 restart <id|name>`. Since the process name is emurr, then run `pm2 restart emurr`.
 
 11. If there isn't any process running, create a new one by running `pm2 start npm --name "app name" -- start`