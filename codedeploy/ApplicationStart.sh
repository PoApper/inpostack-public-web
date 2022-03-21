#!/usr/bin/bash

source /home/ubuntu/.bashrc

REPOSITORY=/home/ubuntu/inpostack-public-web
cd $REPOSITORY

pm2 restart pm2.config.json
