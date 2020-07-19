FROM node:alpine AS builder
COPY . ./frontend2
WORKDIR /frontend2

RUN apk update && \
    apk upgrade && \
    apk add git
    
RUN npm i
RUN $(npm bin)/ng build --prod --build-optimizer=false --aot=false

FROM nginx:alpine
COPY --from=builder /frontend2/dist/frontend2/ /usr/share/nginx/html/