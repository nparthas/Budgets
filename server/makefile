PYTHON := python3

IMAGE := $(shell basename `pwd`)

TEST_DIR := test/api


.PHONY: default-target
default-target: run

.PHONY: run
run:
	$(PYTHON) manage.py runserver

.PHONY: test
test: 
	$(PYTHON) manage.py test $(TEST_DIR)
