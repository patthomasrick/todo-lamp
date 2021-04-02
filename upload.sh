#!/bin/sh

ng build --prod --optimization
tar -cvf todo.tar dist/todo-patrickwthomas-net
scp todo.tar hostgator:~/
ssh hostgator 'rm -rf dist dev.patrickwthomas.net && tar -xvf todo.tar && cp dist/todo-patrickwthomas-net dev.patrickwthomas.net -r'

