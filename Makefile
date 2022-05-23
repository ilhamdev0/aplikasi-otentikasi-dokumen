all: help

generate:
	@sed "s/UID=x/UID=$(shell id -u)/" .env.base > .env
	@echo "File .env telah dibuat, harap edit sesuai kebutuhan"
	@systemctl start docker
	@echo "Build Docker"
	@docker-compose up -d --build
	@echo "Selesai"
env:
	@sed "s/UID=x/UID=$(shell id -u)/" .env.base > .env
	@echo "File .env telah dibuat, harap edit sesuai kebutuhan"
rebuild:
	@systemctl start docker
	@docker-compose up -d --build
up:
	@docker-compose up -d
down:
	@docker-compose down
	@systemctl stop docker
websrv:
	@docker exec -it -u $(shell id -u) "webserver" /bin/bash

help:
	@echo "Warning: Hanya dikhususkan untuk kebutuhan development saja"
	@echo "Gunakan command 'make generate' saat pertama kali install"
	@echo "command lain yang dapat dipakai:"
	@echo " make generate		: Setup saat pertama kali install"
	@echo " make rebuild		: Melakukan build ulang seluruh container"
	@echo " make up		: Mengaktifkan seluruh container"
	@echo " make down		: Menonaktifkan seluruh container"
	@echo " make env		: Generate file .env"
	@echo " make websrv		: Masuk ke terminal container 'webserver'"
	
