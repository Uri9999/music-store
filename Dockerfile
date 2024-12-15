# Dùng Node.js lightweight base image
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy thư mục đã build (được upload từ GitHub Actions hoặc máy cục bộ)
COPY .output/ ./

# Expose port 3000
EXPOSE 3000

# Chạy ứng dụng đã build
CMD ["node", "server/index.mjs"]
