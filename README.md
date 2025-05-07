docker buildx build --platform linux/amd64 -t tranhieuphuc12/express-backend --push ./backend
docker buildx create --use
docker buildx build --platform linux/amd64 -t tranhieuphuc12/nextjs-frontend --push ./frontend
