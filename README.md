
# Pepy Package Download Stats Viewer

A simple Next.js application with an API route proxy to fetch Python package download statistics from [pepy.tech](https://pepy.tech) API.  
Allows users to query any Python package’s download stats securely using your Pepy API key.

---

## Features

- Fetch download stats for any Python package via `/api/pepy?package=package_name`
- Server-side API route hides your Pepy API key from clients
- CORS enabled for cross-origin requests
- Easily extendable to build UI and charts

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Pepy API key from your [user profile](https://pepy.tech/profile)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Shinjan-saha/python-package-stats.git
   cd python-package-stats
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the project root and add your Pepy API key

   ```
   PEPY_API_KEY=your_pepy_api_key_here
   ```

4. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit

   ```
   http://localhost:3000/api/pepy?package=pyfilterlab
   ```

   Replace `pyfilterlab` with any Python package name you want to query.

---

## API Route Details

### Endpoint

```
GET /api/pepy?package={package_name}
```

- **package** (query parameter) — the Python package name you want download stats for.

### Example Request

```
GET http://localhost:3000/api/pepy?package=requests
```

### Response Example

```json
{
  "id": "requests",
  "total_downloads": 1395207458,
  "versions": [
    "1.0",
    "1.1"
  ],
  "downloads": {
    "2023-08-29": {
      "1.0": 1142321,
      "1.1": 1231
    },
    "2023-08-28": {
      "1.0": 1241242,
      "1.1": 3234
    }
  }
}
```

---

## Pepy API Documentation (from https://pepy.tech)

### Base URL

```
https://api.pepy.tech
```

### Authentication

All API requests require an API key included in the header:

```
X-API-Key: your_api_key
```

### Rate Limits

| User Type   | Requests Per Minute |
| ----------- | ------------------- |
| Free users  | 10                  |
| Pro users   | 100                 |

### Get Project Statistics

```
GET /api/v2/projects/{project}
```

- **Path Parameter:** `project` (string) — Python package name.

### Response Status Codes

| Code | Description               |
| ---- | ------------------------- |
| 200  | Successful response       |
| 401  | Missing or invalid API key|
| 404  | Project not found         |
| 429  | Rate limit exceeded       |

---

## Notes

- Your Pepy API key should **never be exposed to clients**. Always use server-side API routes as proxy.
- Remember to restart your dev server whenever you change `.env`.
- You can build a frontend UI to call `/api/pepy` endpoint with user input for the package name.

---

 

