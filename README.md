# KPSC Online Judge
Online judge system for KPSC

## 실행 환경

- Docker Desktop: 2.3.0.3, Docker Engine: 19.03.8, Docker Compose: 1.25.5
- Node.js: 12.18.1


## 실행 방법
1. 아래 명령어를 리포지토리 최상위 폴더에서 실행
```
> docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

2. 웹 브라우저로 localhost에 접속(80포트)
