# Social Backend

A social network API based on twitter under development using solid design and clean arquitecture principles.

## Disclaimer

Developed just for academic reasons by a junior developer with little experience, feel free to correct any mistakes I make, I'll be glad to learn from you.

## Scripts

**dev**: Start server in development mode

**start**: Start server in production mode

**test**: Run test suits with jest

**build**: Compile typescript files to plain javascript files into "dist" folder

## Endpoints

**:lock::** Requires authentication

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/users?page=# &nbsp; • &nbsp; Get a list of all users</summary>

### **Request**

```json
"query": {
    "page": "<number integer positive required>"
}
```

### **Response**

**Code** : `200 OK`

```json
"header": {
    "x-total-count": "<number>",
    "x-total-pages": "<number>"
}

"body": [
    {
        "name": "<string>",
        "tag": "<string>",
        "createdAt": "<Date>",
        "updatedAt": "<Date>"
    }
]
```

</details>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/users/:id &nbsp; • &nbsp; Get data from a specific user searching for its id</summary>

### **Request**

```json
"params": {
    "id": "<string required>"
}
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string",
    "name": "<string>",
    "tag": "<string>",
    "createdAt": "<Date>",
    "updatedAt": "<Date>"
}
```

</details>

<details>
<summary><b>POST</b> &nbsp; • &nbsp; /api/users &nbsp; • &nbsp; Create a new user with the data provided</summary>

### **Request**

```json
"body": {
    "email": "<string email max(50) required>",
    "name": "<string max(50) required>",
    "tag": "<string alphanum max(30) required>",
    "password": "<string min(8) max(30) required>"
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "id": "<string>",
    "email": "<string>",
    "name": "<string>",
    "tag": "<string>",
    "createdAt": "<Date>"
}
```

</details>

<details>
<summary><b>PUT</b> &nbsp; • &nbsp; /api/users/:id :lock: &nbsp; • &nbsp; Update a user searching for its id</summary>

### **Request**

```json
"params": {
    "id": "<string required>"
},

"header": {
    "authorization": "<string bearer token required>"
},

"body": {
    "email": "<string email max(50) required>",
    "password": "<string min(8) max(30) required>"
}
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string>",
    "email": "<string>",
    "name": "<string>",
    "tag": "<string>",
    "createdAt": "<Date>",
    "updatedAt": "<Date>"
}
```

</details>

<details>
<summary><b>DELETE</b> &nbsp; • &nbsp; /api/users/:id :lock: &nbsp; • &nbsp; Delete a user searching for its id</summary>

### **Request**

```json
"params": {
    "id": "<string required>"
},

"header": {
    "authorization": "<string bearer token required>"
},
```

### **Response**

**Code** : `200 OK`

```json

```

</details>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/sessions :lock: &nbsp; • &nbsp; Get data from the user authenticated</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required>"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string>",
    "email": "<string>",
    "name": "<string>",
    "tag": "<string>",
    "createdAt": "<Date>",
    "updatedAt": "<Date>"
}
```

</details>

<details>
<summary><b>POST</b> &nbsp; • &nbsp; /api/sessions &nbsp; • &nbsp; Create a new session with user data provided</summary>

### **Request**

```json
"body": {
    "email": "<string email max(50) required>",
    "password": "<string min(8) max(30) required>"
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "token": "<string>",
    "user": {
        "id": "<string>",
        "email": "<string>",
        "name": "<string>",
        "tag": "<string>",
        "createdAt": "<Date>",
        "updatedAt": "<Date>"
    }
}
```

</details>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/posts?page=#&authorId=# &nbsp; • &nbsp; Get a list of all posts</summary>

### **Request**

```json
"query": {
    "page": "<number integer positive required>",
    "authorId": "<string optional>"
},
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "id": "<string>",
    "text": "<string>",
    "author": {
        "id": "<string>",
        "email": "<string>",
        "name": "<string>",
        "tag": "<string>",
        "createdAt": "<Date>",
        "updatedAt": "<Date>"
    },
    "createdAt": "<Date>"
}
```

</details>

<details>
<summary><b>POST</b> &nbsp; • &nbsp; /api/posts :lock: &nbsp; • &nbsp; Create a new post with data provided and author from authentication</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required>"
},

"body": {
    "text": "<string email max(256) required>",
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "id": "<string>",
    "text": "<string>",
    "author": {
        "id": "<string>",
        "email": "<string>",
        "name": "<string>",
        "tag": "<string>",
        "createdAt": "<Date>",
        "updatedAt": "<Date>"
    },
    "createdAt": "<Date>"
}
```

</details>
