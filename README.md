# Pawmaru

반려동물 용품 쇼핑몰 졸업작품입니다. Next.js 프론트엔드, Spring Boot API, PostgreSQL을 각각의 컨테이너로 운영합니다.

## Documents

- `docs/ERD.md`: 데이터 모델과 관계
- `docs/구현_우선순위.md`: MVP 범위와 4주 실행 순서
- `docs/포우마루_작품계획서.md`: 작품 계획서

## Current layout

- Public host: `https://kdu-shop.duckdns.org`
- Shared edge network: `pawmaru-edge`
- Frontend upstream: `pawmaru-frontend:3000`
- Private application network: `pawmaru-backend`
- Database: PostgreSQL 16, Docker volume `pawmaru_postgres_data`
- Database ports are not published to the host.

The independent `/opt/gateway` Compose project is the only service bound to host
ports 80 and 443. Pawmaru HTTP requests are redirected to HTTPS. The gateway
routes requests by the HTTP `Host` header and reaches Pawmaru over the external
`pawmaru-edge` Docker network.

## First database start

Create the local environment file and replace the password before starting the
database. Never commit `.env`.

```bash
cp .env.example .env
chmod 600 .env
docker compose up -d db
docker compose ps
```

## Application containers

The gateway contract remains stable while the application is independently deployed:

- container/service name: `pawmaru-frontend`
- listen port inside the container: `3000`
- attach the container to `pawmaru-edge`

The Spring Boot container and PostgreSQL only join the private `pawmaru-backend`
network. Browser `/api` requests are forwarded by Next.js to the backend.

## Useful checks

```bash
docker compose config --quiet
docker compose ps
docker exec routeon-frontend nginx -t
curl -I http://kdu-shop.duckdns.org
```

Before changing the RouteOn gateway, validate its Compose and Nginx
configuration. Reload Nginx only after the test succeeds.
