#!/usr/bin/bash

source /home/ubuntu/.bashrc

pm2 stop inpostack-public-web

rm -rf /home/ubuntu/inpostack-public-web

mkdir /home/ubuntu/inpostack-public-web
