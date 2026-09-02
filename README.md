# Pawmaru infrastructure

포우마루 개발·운영 인프라의 기본 구성입니다.

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

## Placeholder frontend

The current frontend is a temporary Nginx page. When the Next.js application is
added, keep these runtime contracts so the shared proxy does not need to change:

- container/service name: `pawmaru-frontend`
- listen port inside the container: `3000`
- attach the container to `pawmaru-edge`

## Useful checks

```bash
docker compose config --quiet
docker compose ps
docker exec routeon-frontend nginx -t
curl -I http://kdu-shop.duckdns.org
```

Before changing the RouteOn gateway, validate its Compose and Nginx
configuration. Reload Nginx only after the test succeeds.
