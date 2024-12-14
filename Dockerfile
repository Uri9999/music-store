# Sử dụng image Node.js chính thức
FROM node:18-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Nuxt3
# RUN npm run build

# Expose cổng 3000
EXPOSE 3000

# Chạy ứng dụng Nuxt3 (preview trong môi trường production)
# CMD ["npm", "run", "preview"]
CMD ["npm", "run", "dev"]
