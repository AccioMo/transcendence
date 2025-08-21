all: build up

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

re : 
	docker-compose down -v --rmi all
	docker-compose -f ./docker-compose.yml up -d
clean:
	docker-compose down -v --rmi all

restart:
	docker-compose restart

.PHONY: build up down logs clean restart re