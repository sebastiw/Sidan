FROM alpine:latest

RUN set -xe && \
    apk --no-cache --update add bash curl less jq nodejs && \
    npm install -g gulp @angular/cli && \
    adduser -D -h /home/user -u 1000 user

COPY . /home/user/

RUN chown -R user:user /home/user

USER user

RUN cd /home/user && \
    make run
