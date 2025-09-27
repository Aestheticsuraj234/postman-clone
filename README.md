
# Postman Clone

<p align="center">
  <img src="./public/post-man-clone.png" alt="Postman Clone" width="600"/>
</p>

A modern, open-source **Postman alternative** built with **Next.js 15, TypeScript, Prisma, TailwindCSS, shadcn/ui, TanStack Query, and Zustand**.  
It provides a sleek UI and developer-focused workflow to test and manage REST APIs and WebSocket connections efficiently.

---

## ✨ Features

### 🔹 REST API Client
- Send HTTP requests with **methods (GET, POST, PUT, DELETE, etc.)**  
- Manage **request parameters, headers, and body (raw JSON / text)**  
- **Request response viewer** with pretty JSON formatting  
- Track **response time, size, and status**  
- Save requests inside **collections** for reusability  
- Request history & response persistence  

### 🔹 WebSocket Client
- Connect to **ws://** and **wss://** endpoints  
- Send and receive messages in real time  
- Support for multiple protocols  
- View messages with metadata (**direction, payload, size, timestamp**)  
- Save messages for later inspection  

### 🔹 Workspace & Collaboration
- Create and manage **multiple workspaces**  
- **Invite team members** via unique invite links  
- Role-based workspace access (Admin, Member)  
- View workspace members with overlapping avatars and hover tooltips  

### 🔹 Additional Utilities
- Raw request body editor powered by **Monaco Editor**  
- JSON pretty print & validation  
- Copy to clipboard & auto-format options  
- Persistent state management with **Zustand**  
- Smooth and modern UI with **shadcn/ui + TailwindCSS**  

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)  
- **Language:** TypeScript  
- **ORM & Database:** Prisma + PostgreSQL  
- **State Management:** Zustand  
- **API Caching/Fetching:** TanStack Query  
- **UI Components:** shadcn/ui + TailwindCSS  
- **Icons:** Lucide-react  
- **Editor:** Monaco Editor  
- **Auth:** Better Auth  
- **Deployment:** Vercel  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Aestheticsuraj234/postman-clone
cd postman-clone
````

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment Variables

Create a `.env` file in the root and add:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/postmanclone"
BETTER_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000 

GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

NEXT_PUBLIC_APP_URL

GOOGLE_GENERATIVE_AI_API_KEY
```

### 4. Setup Database

```bash
npx prisma migrate dev
npx prisma db seed   # if you have seeds
```

### 5. Run the Development Server

```bash
npm run dev
```

App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 📦 Project Structure

```
/app
  /api             → API routes (REST & WebSocket server actions)
  /(workspace)     → Workspace-specific routes
  /invite          → Invite link pages
/components        → Reusable UI components
/modules           → Features (auth, invites, requests, websockets, etc.)
/lib               → Utilities (db, auth, store)
```

---

## 🤝 Special Thanks

* **Postman** – for inspiring the core idea
* **Next.js & Vercel** – for providing a powerful fullstack framework
* **shadcn/ui** – for beautiful and accessible UI components
* **TanStack Query & Zustand** – for data and state management
* All open-source contributors & libraries used in this project 🙏

---


## 📜 License

This project is **MIT Licensed**.
Feel free to fork, contribute, and build your own features on top of it!



