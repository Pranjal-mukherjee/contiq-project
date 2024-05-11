FROM openjdk:17

WORKDIR /micro-service

COPY target/*.jar app.jar

EXPOSE 9005

CMD [ "java","-jar","app.jar" ]