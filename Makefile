PROJECT = sidan
VERSION = $(shell git describe)
IMAGE = $(PROJECT):$(VERSION)

all: image

image:
	docker build --rm -t $(IMAGE) .


run:
	npm install
	cd frontend
	npm install
	cd ..
	gulp
