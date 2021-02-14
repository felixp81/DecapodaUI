{\rtf1\ansi\ansicpg1252\cocoartf2578
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\csgray\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f0\fs22 \cf2 \CocoaLigature0 # Stage 0, "build-stage", based on Node.js, to build and compile the frontend\
FROM tiangolo/node-frontend:10 as build-stage\
WORKDIR /app\
COPY package*.json /app/\
RUN npm install\
COPY ./ /app/\
ARG configuration=production\
RUN npm run build -- --output-path=./dist/out --configuration $configuration\
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx\
FROM nginx:1.15\
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html\
# Copy the default nginx.conf provided by tiangolo/node-frontend\
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf\
}