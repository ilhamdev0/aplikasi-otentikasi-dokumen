# Sistem Otentikasi Dokumen Digital

---
## Warning!

> Aplikasi ini dibuat untuk memenuhi tugas akhir (TA) sehingga levelnya masih sangat jauh dari production grade, Jika tetap ingin menggunakan selalu ingat bahwa kemungkinan masih ada bug atau celah keamanan yang tidak diketahui.

---

## Deskripsi
Aplikasi ini merupakan proof of concept (POC) yang didasari oleh penelitian mengenai implementasi digital signature pada dokumen digital untuk memastikan keaslian suatu dokumen digital

## Spesifikasi Tech Stack
- Type: Web Application
- Architecture: MVC
- Core Language: Javascript (Typescript)
- Framework: AdonisJS 5
- CSS Library: Bootstrap 5
- Database: MySQL 8
- Container: Docker

## Requirement Installasi
- `Linux` based OS
- `NodeJS` >= 16
- `npm` alternatif `Yarn`, `Pnpm` atau lainnya
- `Docker`
- `Make`

## Cara Install

1. Clone repo
2. jalankan perintah berikut untuk setup pertama kali

```
make generate
```

3. edit file .env sesuai kebutuhan
4. Jalankan aplikasi dengan perintah

```
make up
```

5. Tunggu beberapa saat lalu akses melalui url http://localhost:80/

## Cara Pakai
Setelah terinstall maka untuk pengunaan selanjutnya bisa dijalankan dengan command

```
make up
```
Untuk menghentikan aplikasi gunakan command berikut

```
make down
```

### Info
Untuk mengetahui perintah lainnya jalankan command

```
make help
```