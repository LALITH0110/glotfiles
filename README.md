# Polyglot File Generator - Frontend

> **glotfiles.dev** - The only online platform to create polyglot files (multi-format files that are valid in multiple formats simultaneously)

[![Live Site](https://img.shields.io/badge/Live%20Site-glotfiles.dev-blue)](https://glotfiles.dev)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Nginx](https://img.shields.io/badge/Nginx-Latest-009639?logo=nginx&logoColor=white)](https://nginx.org/)
[![DigitalOcean](https://img.shields.io/badge/DigitalOcean-Droplet-0080FF?logo=digitalocean&logoColor=white)](https://www.digitalocean.com/)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2015-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 🐛 Reporting Issues & Bugs

Found a bug on **glotfiles.dev**? You are in the right place!

We use this repository as the **central issue tracker** for the entire project, including the Frontend (UI) and the Backend (File Generation API).

### How to Report a Bug

Since the [Backend API code is currently closed-source](https://glotfiles.dev), please report **all** issues (Server Errors, 500s, or Generation Failures) right here in the [Issues tab](../../issues).

**Before reporting:**
- ✅ Check if the issue has already been reported
- ✅ Try refreshing the page and clearing your browser cache
- ✅ Ensure your files meet the size requirements

**When reporting, please include:**
- 🐛 Description of the bug
- 📝 Steps to reproduce
- 🖼️ Screenshots (if applicable)
- 🌐 Browser and OS information
- 📦 File types and sizes you were trying to combine

---

## 📖 About

**Polyglot File Generator** is a web application that creates polyglot files - files that are valid in multiple formats simultaneously. This repository contains the **frontend** code built with Next.js, React, and TypeScript.

The frontend communicates with a separate backend API for file processing. The backend API is currently closed-source.

### 🌟 Features

- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📁 **Multiple Combinations** - Support for 10+ polyglot file combinations
- 🚀 **Fast Processing** - Efficient file generation via backend API
- 🔒 **Privacy-First** - Files are processed in memory and never stored
- 📊 **Analytics** - Track polyglot file generation count via Firebase
- ♿ **Accessible** - Built with accessibility in mind
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile

### 📦 Supported Polyglot Combinations

| Combination | Files Required | Output Format | Use Case |
|------------|----------------|---------------|----------|
| **PDF + HTML** | 2 | Dual | Documents that render as webpages |
| **PDF + Image** | 2 | Dual | Documents with image thumbnails |
| **Image + ZIP** | 2 | Dual | Images containing hidden archives |
| **PDF + ZIP** | 2 | Dual | Documents with embedded files |
| **PDF + Video** | 2 | MP4 | Documents that play as video |
| **ZIP + Video** | 2 | MP4 | Archives that play as video |
| **Image + Video** | 2 | MP4 | Images that play as video |
| **PDF + Video + ZIP** | 3 | MP4 | Triple-format files |
| **ZIP + Video + Image** | 3 | MP4 | Triple-format files |
| **Image + Video + PDF** | 3 | MP4 | Triple-format files |
| **PDF + Video + Image + ZIP** | 4 | MP4 | Ultimate polyglot |

### File Size Limits

| File Type | Max Size | Supported Extensions |
|-----------|----------|---------------------|
| PDF | 50 MB | `.pdf` |
| Images | 25 MB | `.png`, `.jpg`, `.jpeg` |
| Videos | 100 MB | `.mp4`, `.mov`, `.avi` |
| Archives | 100 MB | `.zip` |

---

## 🏗️ Architecture

### Frontend (This Repository)
- **Framework**: Next.js 15.2.6
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **Components**: Radix UI + shadcn/ui
- **State Management**: React Hooks
- **Analytics**: Firebase Firestore + Google Analytics

### Backend (Separate Repository - Closed Source)
- **Language**: Python 3.x
- **Web Server**: Nginx (reverse proxy)
- **Hosting**: DigitalOcean Droplet
- **Functionality**: Handles file processing and polyglot generation
- **API**: Exposes REST API endpoint: `/api/generate-polyglot`
- **Processing**: Files are processed in memory (no persistent storage)
- **Output**: Returns generated polyglot file as download

---


## 🔒 Privacy & Security

- **No File Storage**: Files are processed in memory only and immediately discarded
- **No Personal Data**: We only collect anonymous usage statistics
- **Secure Processing**: Files are handled securely during the upload and processing period
- **Privacy Policy**: See [Privacy & Terms](/privacy-terms) page

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is private. All rights reserved.

---

## 👤 Author

**Lalith Kothuru**

- Website: [lalithkothuru.com](https://www.lalithkothuru.com)
- Email: [lalith.kothuru@gmail.com](mailto:lalith.kothuru@gmail.com)
- GitHub: [@LALITH0110](https://github.com/LALITH0110)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn](https://twitter.com/shadcn) for the beautiful component library
- All contributors and users of glotfiles.dev

---

## 📊 Project Status

✅ **Active Development** - Regularly maintained and updated

**Live Site**: [glotfiles.dev](https://glotfiles.dev)

---

## 📞 Support

For issues, questions, or suggestions:
- 🐛 [Report a Bug](../../issues)
- 💬 [Contact Me](mailto:lalith.kothuru@gmail.com)
- 🌐 [Visit the Site](https://glotfiles.dev)

---

*Made by [Lalith Kothuru](https://www.lalithkothuru.com)*
