PYTHON := python3

IMAGE := $(shell basename `pwd`)

APP_DIR := app
TEST_DIR := $(APP_DIR)/test/

.PHONY: default-target
default-target: run

.PHONY: run
run:
	$(PYTHON) $(APP_DIR)/manage.py runserver

.PHONY: test
test: 
	$(PYTHON) $(APP_DIR)/manage.py test $(TEST_DIR)
