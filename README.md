# 🚀 Vig-AI — AI-Powered Career Guidance Platform

**Vig-AI** is a comprehensive, AI-powered career guidance platform that empowers users to make smarter career decisions. From real-time industry insights to smart resume building and interview test practice — Vig-AI is your career co-pilot. Built with modern technologies and integrated with **Gemini AI**, the platform is optimized for performance and scalability.

---

## 🌐 GitHub Repository

🔗 [https://github.com/shivamkumar692005/vig-ai](https://github.com/shivamkumar692005/vig-ai)

---

## ✨ Features

- 🔍 **Industry Insights:** Explore the latest trends and roles in various industries.
- 📄 **Resume Builder:** Easily build and manage professional resumes.
- 🤖 **AI Resume Enhancer:** Use Gemini AI to polish and improve your resume.
- 📨 **Cover Letter Generator:** Instantly create job-specific cover letters using AI.
- 🧪 **Interview Test Practice:** Prepare for interviews with skill-based tests.
- 🔐 **Secure Authentication:** Powered by [Clerk](https://clerk.com) for user authentication.
- 🕒 **Scheduled Jobs:** Automated background tasks with [Inngest](https://www.inngest.com/)
- 🐳 **Containerized:** Built with Docker for easy deployment and scalability.

---

## 🧰 Tech Stack

| Tech             | Description                                  |
|------------------|----------------------------------------------|
| **Next.js**      | React-based full-stack framework             |
| **Tailwind CSS** | Utility-first CSS framework                  |
| **Prisma**       | Type-safe ORM for PostgreSQL                 |
| **PostgreSQL**   | Relational database                          |
| **ShadCN UI**    | Accessible and modern UI components          |
| **Gemini AI**    | Used for resume enhancement and cover letters|
| **Docker**       | Containerization for local & production use  |
| **Clerk**        | Auth solution for modern apps                |
| **Inngest**      | Serverless event workflows and cron job scheduling   |


---

## 🚀 How to Run Locally

### ✅ Option 1: Run Locally **Without Docker**

#### 1. Clone the Repository

```bash
git clone https://github.com/shivamkumar692005/vig-ai.git
cd vig-ai
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_public_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/onboarding"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"
GEMINI_API_KEY="Your key"
```

#### 4. Set Up Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

#### 5. Start the Development Server

```bash
npm run dev
```

➡️ Visit [http://localhost:3000](http://localhost:3000)

---

### 🐳 Option 2: Run Locally **With Docker**

#### 1. Clone the Repository

```bash
git clone https://github.com/shivamkumar692005/vig-ai.git
cd vig-ai
```

#### 2. Create `.env` File

Create a `.env` file in the project root as described above.

#### 3. Build and Run with Docker Compose

```bash
docker-compose up
```

The app will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```bash
vig-ai/
├── app/                # App Router directory for routing and layouts
├── components/         # Reusable UI components
├── actions/            # Server actions
├── data/               # Static/local JSON or mock data
├── hooks/              # Custom React hooks
├── lib/                # Utility modules (e.g., db client, helpers)
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets like images
├── types/              # Global TypeScript types
├── styles/             # Tailwind and global CSS (if any)
├── middleware.ts       # Middleware for auth, redirects, etc.
├── docker-compose.yml  # Docker Compose config
├── Dockerfile          # Docker build config
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript config
└── README.md           # Project documentation

```

---

## 📌 Environment Variables (.env)

Here’s a sample `.env` file:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_public_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/onboarding"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"
GEMINI_API_KEY="Your key"

```

---
### 🐳 Docker Build Error Fix

If you encounter a Docker build error related to Prisma, it might be caused by the `postinstall` script in the `package.json` file. To resolve this issue, follow these steps:

1. Open the `package.json` file in the root directory of your project.
2. Locate the following line under the `scripts` section:

   ```json
   "postinstall": "prisma generate"
   ```

3. Remove or comment out this line to prevent Prisma from running during the Docker build process.

   After modification, your `scripts` section should look like this:

   ```json
   "scripts": {
     "dev": "next dev --turbopack",
     "build": "next build",
     "start": "next start",
     "lint": "next lint"
   }
   ```

4. Save the file and rebuild the Docker container.

   ```bash
   docker-compose up --build
   ```

5. Once the container is running, you can manually generate the Prisma client by running the following command inside the container:

   ```bash
   npx prisma generate
   ```

This should resolve the Docker build error while still allowing you to use Prisma in your project.

---





## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/shivamkumar692005/vig-ai/issues).

---




## 🙋‍♂️ Author

**Shivam Kumar**  
🔗 [GitHub](https://github.com/shivamkumar692005)  
🔗 [LinkedIn](https://www.linkedin.com/in/shivam-kumar-4177202aa/)

---

## ⭐️ Show Your Support

Give a ⭐️ if this project helped you or inspired you!