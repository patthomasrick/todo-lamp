#!/bin/sh

ng build --prod --optimization
tar -cvf todo.tar dist/todo-patrickwthomas-net
scp todo.tar pwt5ca@patrickwthomas.net:~/
ssh pwt5ca@patrickwthomas.net 'rm -rf dist dev.patrickwthomas.net && tar -xvf todo.tar && cp dist/todo-patrickwthomas-net dev.patrickwthomas.net -r'

