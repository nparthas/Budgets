PYTHON := python3

COMPOSE := docker-compose
SERVER := server
DB := db

TEST_DIR := test

DJANGO := $(PYTHON) manage.py

.PHONY: default-target
default-target: run

.PHONY: up
up:
	$(COMPOSE) up -d --build

.PHONY: down
down:
	$(COMPOSE) down

.PHONY: run
run: up

.PHONY: sh
sh:
	$(COMPOSE) exec $(SERVER) sh

.PHONY: sh-db
sh-db:
	$(COMPOSE) exec $(DB) psql --username=$(SQL_USER) --dbname=$(SQL_DATABASE)

.PHONY: migrations
migrations:
	$(COMPOSE) exec $(SERVER) $(DJANGO) migrate --noinput

.PHONY: test
test:
	$(COMPOSE) exec $(SERVER) $(DJANGO) test $(TEST_DIR)

.PHONY: secret-key
secret-key:
	@$(PYTHON) -c 'import secrets; print(secrets.token_hex(100))'