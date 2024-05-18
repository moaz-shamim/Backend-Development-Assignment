# Task Management API Documentation

## Base URL

```
http://localhost:8080
```

## Endpoints

### 1. Get All Tasks (with Pagination)

**Endpoint:** `/api/tasks`  
**Method:** `GET`  
**Query Parameters:**

- `page` (optional): Page number (default is 1)
- `limit` (optional): Number of tasks per page (default is 10)

**Sample Request:**

```
GET /api/tasks?page=1&limit=5
```

**Sample Response:**

```json
{
  "total": {
    "page": 6
  },
  "next": {
    "page": 2,
    "limit": 5
  },
  "results": [
    {
      "id": 1,
      "title": "Task 1",
      "description": "Description 1",
      "completed": true
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": "Description 2",
      "completed": true
    },
    {
      "id": 3,
      "title": "Task 3",
      "description": "Description 3",
      "completed": false
    },
    {
      "id": 4,
      "title": "Task 4",
      "description": "Description 4",
      "completed": false
    },
    {
      "id": 5,
      "title": "Task 5",
      "description": "Description 5",
      "completed": false
    }
  ]
}
```

**Sample Request: filtering options for task retrieval**

```
GET /api/tasks?/api/tasks?completed=true
```
```json
{
    "total": {
        "page": 2
    },
    "next": {
        "page": 2,
        "limit": 10
    },
    "results": [
        {
            "id": 1,
            "title": "Updated Task 1",
            "description": "Updated Description 1",
            "completed": true
        },
        {
            "id": 2,
            "title": "Task 2",
            "description": "Description 2",
            "completed": true
        },
        {
            "id": 8,
            "title": "Task 8",
            "description": "Description 8",
            "completed": true
        },
        {
            "id": 9,
            "title": "Task 9",
            "description": "Description 9",
            "completed": true
        },
        {
            "id": 10,
            "title": "Task 10",
            "description": "Description 10",
            "completed": true
        },
        {
            "id": 16,
            "title": "Task 17",
            "description": "Description 17",
            "completed": true
        },
        {
            "id": 17,
            "title": "Task 18",
            "description": "Description 18",
            "completed": true
        },
        {
            "id": 18,
            "title": "Task 19",
            "description": "Description 19",
            "completed": true
        },
        {
            "id": 19,
            "title": "Task 20",
            "description": "Description 20",
            "completed": true
        },
        {
            "id": 20,
            "title": "Task 21",
            "description": "Description 21",
            "completed": true
        }
    ]
}
```

### 2. Get Task by ID

**Endpoint:** `/api/tasks/:id`  
**Method:** `GET`  
**Path Parameters:**

- `id`: Task ID

**Sample Request:**

```
GET /api/tasks/1
```

**Sample Response:**

```json
{
  "id": 1,
  "title": "Task 1",
  "description": "Description 1",
  "completed": true
}
```

**Error Response: If Task with that Id is not present.**

```json
{
  "status": "Task not Found"
}
```

### 3. Create a New Task

**Endpoint:** `/api/tasks`  
**Method:** `POST`  
**Request Body:**

```json
{
  "title": "Task 1",
  "description": "Description 1",
  "completed": false
}
```

**Sample Request:**

```
POST /api/tasks
Content-Type: application/json

{
    "title": "Task 1",
    "description": "Description 1",
    "completed": false
}
```

**Sample Response:**

```json
{
  "status": "Task Created successfully",
  "id": 1
}
```

**Error Response:**

```json
{
  "status": "Title and Description both Required"
}
```

### 4. Update a Task by ID

**Endpoint:** `/api/tasks/:id`  
**Method:** `PUT`  
**Path Parameters:**

- `id`: Task ID

**Request Body:**

```json
{
  "title": "Updated Task 1",
  "description": "Updated Description 1",
  "completed": true
}
```

**Sample Request:**

```
PUT /api/tasks/1
Content-Type: application/json

{
    "title": "Updated Task 1",
    "description": "Updated Description 1",
    "completed": true
}
```

**Sample Response:**

```json
{
  "status": "Task 1 Updated successfully"
}
```

**Error Responses:**

- When title or description is missing:
  ```json
  {
    "status": "Title and Description both Required"
  }
  ```
- When task is not found:
  ```json
  {
    "status": "Task not Found"
  }
  ```
- When there's an error during the update process:
  ```json
  {
    "status": "Error while updating Task"
  }
  ```

### 5. Delete a Task by ID

**Endpoint:** `/api/tasks/:id`  
**Method:** `DELETE`  
**Path Parameters:**

- `id`: Task ID

**Sample Request:**

```
DELETE /api/tasks/1
```

**Sample Response:**

```json
{
  "status": "Task-1 Deleted Successfully"
}
```

**Error Response:**

```json
{
  "status": "Task not Found"
}
```

## Running the Server

To start the server, run:

```
npm run dev
```

Ensure that `express`, `fs`, and other dependencies are installed and that the `DATA.json` file exists and is properly formatted. The server will listen on port 8080 by default.

## Notes

- All the data are stored on `DATA.json` on the server in the root file.
- Data stored in json format.
- The `paginatedResults` middleware function should handle the pagination logic and add the paginated results to `res.paginatedResults`.
- Pagination functionality is implemented in the `utils.js` file.
