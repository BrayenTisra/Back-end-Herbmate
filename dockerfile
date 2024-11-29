# Gunakan image Node.js resmi dengan versi terbaru (versi LTS yang stabil)
FROM node:18-slim

# Set working directory dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies aplikasi
RUN npm install

# Salin seluruh kode aplikasi ke container
COPY . .

# Tentukan port yang akan digunakan aplikasi
EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
