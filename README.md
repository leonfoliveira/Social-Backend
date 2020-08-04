# Social Backend

A social network API based on twitter under development using TDD, solid design and clean arquitecture principles.

## Disclaimer

Developed just for academic reasons by a junior developer with little experience, feel free to correct any mistakes I make, I'll be glad to learn from you.

## Scripts

**dev**: Start server in development mode

**start**: Start server in production mode

**test**: Run test suits with jest

**build**: Compile typescript files to plain javascript files into "dist" folder

**migrate**: Migrate the database specified by environment variables

## Endpoints

**:lock::** Requires authentication

<br/>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/sessions :lock: &nbsp; • &nbsp; Get data from the user authenticated</summary>

### **Request**

```json
"header": {
    "authorization": "<string required> [Bearer JWT token]"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string> [User id]",
    "email": "<string> [User email]",
    "name": "<string> [User name]",
    "tag": "<string> [User tag]",
    "followers": "<number> [User followers counter]",
    "following": "<number> [User following counter]",
    "createdAt": "<Date> [User date/time of creation]",
    "updatedAt": "<Date> [User date/time of last update]"
}
```

</details>

<details>
<summary><b>POST</b> &nbsp; • &nbsp; /api/sessions &nbsp; • &nbsp; Create a new session with user data provided (signin)</summary>

### **Request**

```json
"body": {
    "email": "<string email max=50 required> [User email]",
    "password": "<string min=8 max=30 required> [User password]"
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "token": "<string> [JWT token]",
    "user": {
        "id": "<string> [User id]",
        "email": "<string> [User email]",
        "name": "<string> [User name]",
        "tag": "<string> [User tag]",
        "followers": "<number> [User followers counter]",
        "following": "<number> [User following counter]",
        "createdAt": "<Date> [User date/time of creation]",
        "updatedAt": "<Date> [User date/time of last update]"
    }
}
```

</details>

---

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/users &nbsp; • &nbsp; Get a list of all users</summary>

### **Request**

```json
"query": {
    "page": "<number integer positive optional default=1> [Page]",
    "per-page": "<number integer positive max=30 optional default=10> [Users per page]",
    "leading": "<boolean> [Get only users with followers and order by followers counter desc]"
}
```

### **Response**

**Code** : `200 OK`

```json
"header": {
    "x-total-count": "<number> [Total of users]",
    "x-total-pages": "<number> [Total of pages]"
}

"body": [
    {
        "id": "<string> [User id]",
        "name": "<string> [User name]",
        "tag": "<string> [User tag]",
        "followers": "<number> [User followers counter]",
        "following": "<number> [User following counter]",
        "createdAt": "<Date> [User date/time of creation]",
        "updatedAt": "<Date> [User date/time of last update]"
    }
]
```

</details>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/users/:id &nbsp; • &nbsp; Get data from a specific user searching for its id</summary>

### **Request**

```json
"params": {
    "id": "<string required> [User id]"
}
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string> [User id]",
    "name": "<string> [User name]",
    "tag": "<string> [User tag]",
    "followers": "<number> [User followers counter]",
    "following": "<number> [User following counter]",
    "createdAt": "<Date> [User date/time of creation]",
    "updatedAt": "<Date> [User date/time of last update]"
}
```

</details>

<details>
<summary><b>POST</b> &nbsp; • &nbsp; /api/users &nbsp; • &nbsp; Create a new user with the data provided</summary>

### **Request**

```json
"body": {
    "email": "<string email max=50 required> [User email]",
    "name": "<string max=50 required> [User name]",
    "tag": "<string alphanum max=30 required> [User tag]",
    "password": "<string min=8 max=30 required> [User password]"
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "id": "<string> [User id]",
    "email": "<string> [User email]",
    "name": "<string> [User name]",
    "tag": "<string> [User tag]",
    "followers": "<number> [User followers counter]",
    "following": "<number> [User following counter]",
    "createdAt": "<Date> [User date/time of creation]",
    "updatedAt": "<Date> [User date/time of last update]"
}
```

</details>

<details>
<summary><b>PUT</b> &nbsp; • &nbsp; /api/users/:id :lock: &nbsp; • &nbsp; Update a user searching for its id</summary>

### **Request**

```json
"params": {
    "id": "<string required> [User id]"
},

"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"body": {
    "email": "<string email max=50 required> [User email]",
    "password": "<string min=8 max=30 required> [User password]"
}
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string> [User id]",
    "email": "<string> [User email]",
    "name": "<string> [User name]",
    "tag": "<string> [User tag]",
    "followers": "<number> [User followers counter]",
    "following": "<number> [User following counter]",
    "createdAt": "<Date> [User date/time of creation]",
    "updatedAt": "<Date> [User date/time of last update]"
}
```

</details>

<details>
<summary><b>DELETE</b> &nbsp; • &nbsp; /api/users/:id :lock: &nbsp; • &nbsp; Delete a user searching for its id</summary>

### **Request**

```json
"params": {
    "id": "<string required> [User id]"
},

"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},
```

### **Response**

**Code** : `200 OK`

```json

```

</details>

---

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/follows &nbsp; • &nbsp; Get list of all follows</summary>

### **Request**

```json
"query": {
    "page": "<number integer positive optional default=1> [Page]",
    "per-page": "<number integer positive max=30 optional default=10> [Follows per page]",
    "follower-id": "<string optional> [User follower id]",
    "target-id": "<string optional> [User target id]"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": [
    {
        "id": "<string> [Follow id]",
        "follower": {
            "id": "<string> [User follower id]",
            "name": "<string> [User follower name]",
            "tag": "<string> [User follower tag]",
            "createdAt": "<Date> [User follower date/time of creation]",
            "updatedAt": "<Date> [User follower date/time of last update]"
        },
        "target": {
            "id": "<string> [User following id]",
            "name": "<string> [User following name]",
            "tag": "<string> [User following tag]",
            "createdAt": "<Date> [User following date/time of creation]",
            "updatedAt": "<Date> [User following date/time of last update]"
        },
        "createdAt": "<Date> [Follow date/time of creation]",
    }
]
```

</details>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/follows/:followerId/:targetId &nbsp; • &nbsp; Get data from a specific follow</summary>

### **Request**

```json
"params": {
    "followerId": "<string required> [User follower id]",
    "targetId": "<string required> [User target id]"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string> [Follow id]",
    "follower": {
        "id": "<string> [User follower id]",
        "name": "<string> [User follower name]",
        "tag": "<string> [User follower tag]",
        "createdAt": "<Date> [User follower date/time of creation]",
        "updatedAt": "<Date> [User follower date/time of last update]"
    },
    "target": {
        "id": "<string> [User following id]",
        "name": "<string> [User following name]",
        "tag": "<string> [User following tag]",
        "createdAt": "<Date> [User following date/time of creation]",
        "updatedAt": "<Date> [User following date/time of last update]"
    },
    "createdAt": "<Date> [Follow date/time of creation]",
}
```

</details>

<details>
<summary><b>POST</b> &nbsp; • &nbsp; /api/follows :lock: &nbsp; • &nbsp; Create a new follow between the user authenticated and a target provided</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"body": {
    "targetId": "<string required> [User target id]",
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "id": "<string> [Follow id]",
    "follower": {
        "id": "<string> [User follower id]",
        "name": "<string> [User follower name]",
        "tag": "<string> [User follower tag]",
        "createdAt": "<Date> [User follower date/time of creation]",
        "updatedAt": "<Date> [User follower date/time of last update]"
    },
    "target": {
        "id": "<string> [User following id]",
        "name": "<string> [User following name]",
        "tag": "<string> [User following tag]",
        "createdAt": "<Date> [User following date/time of creation]",
        "updatedAt": "<Date> [User following date/time of last update]"
    },
    "createdAt": "<Date> [Follow date/time of creation]",
}
```

</details>

<details>
<summary><b>DELETE</b> &nbsp; • &nbsp; /api/follows/:id :lock: &nbsp; • &nbsp; Delete a follow searching for its id</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"params": {
    "id": "<string required> [Follow id]",
}
```

### **Response**

**Code** : `201 CREATED`

```json

```

</details>

---

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/posts &nbsp; • &nbsp; Get a list of all posts</summary>

### **Request**

```json
"query": {
    "page": "<number integer positive optional default=1> [Page]",
    "per-page": "<number integer positive optional max=30 default=10> [Posts per page]",
    "author-id": "<string optional> [User author id]"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": [
    {
        "id": "<string> [Post id]",
        "text": "<string> [Post text]",
        "likes": "<number> [Post likes counter]",
        "author": {
            "id": "<string> [User author id]",
            "name": "<string> [User author name]",
            "tag": "<string> [User author tag]",
            "createdAt": "<Date> [User author date/time of creation]",
            "updatedAt": "<Date> [User author date/time of last update]"
        },
        "createdAt": "<Date> [Post date/time of creation]",
        "updatedAt": "<Date> [Post date/time of last update]"
    }
]
```

</details>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/posts/:id &nbsp; • &nbsp; Get data from a specific post searching for it's id</summary>

### **Request**

```json
"params": {
    "id": "<string required> [Post id]"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string> [Post id]",
    "text": "<string> [Post text]",
    "likes": "<number> [Post likes counter]",
    "author": {
        "id": "<string> [User author id]",
        "name": "<string> [User author name]",
        "tag": "<string> [User author tag]",
        "createdAt": "<Date> [User author date/time of creation]",
        "updatedAt": "<Date> [User author date/time of last update]"
    },
    "createdAt": "<Date> [Post date/time of creation]",
    "updatedAt": "<Date> [Post date/time of last update]"
}
```

</details>

<details>
<summary><b>POST</b> &nbsp; • &nbsp; /api/posts :lock: &nbsp; • &nbsp; Create a new post with the data provided and author from authentication</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"body": {
    "text": "<string max=256 required> [Post text]",
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "id": "<string> [Post id]",
    "text": "<string> [Post text]",
    "likes": "<number> [Post likes counter]",
    "author": {
        "id": "<string> [User author id]",
        "email": "<string> [User email]",
        "name": "<string> [User author name]",
        "tag": "<string> [User author tag]",
        "createdAt": "<Date> [User author date/time of creation]",
        "updatedAt": "<Date> [User author date/time of last update]"
    },
    "createdAt": "<Date> [Post date/time of creation]",
    "updatedAt": "<Date> [Post date/time of last update]"
}
```

</details>

<details>
<summary><b>PUT</b> &nbsp; • &nbsp; /api/posts/:id :lock: &nbsp; • &nbsp; Update a post with the data provided</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"params": {
    "id": "<string required> [Post id]"
}

"body": {
    "text": "<string max=256 required> [Post text]",
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "id": "<string> [Post id]",
    "text": "<string> [Post text]",
    "likes": "<number> [Post likes counter]",
    "author": {
        "id": "<string> [User author id]",
        "email": "<string> [User email]",
        "name": "<string> [User author name]",
        "tag": "<string> [User author tag]",
        "createdAt": "<Date> [User author date/time of creation]",
        "updatedAt": "<Date> [User author date/time of last update]"
    },
    "createdAt": "<Date> [Post date/time of creation]",
    "updatedAt": "<Date> [Post date/time of last update]"
}
```

</details>

<details>
<summary><b>DELETE</b> &nbsp; • &nbsp; /api/posts/:id :lock: &nbsp; • &nbsp; Delete a post searching for its id</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"params": {
    "id": "<string required> [Post id]"
},

"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},
```

### **Response**

**Code** : `200 OK`

```json

```

</details>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/posts/feed :lock: &nbsp; • &nbsp; Get a list of last posts from following users and the authenticated user</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"query": {
    "page": "<number integer positive optional default=1> [Page]",
    "per-page": "<number integer positive optional max=30 default=10> [Posts per page]"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": [
    {
        "id": "<string> [Post id]",
        "text": "<string> [Post text]",
        "likes": "<number> [Post likes counter]",
        "author": {
            "id": "<string> [User author id]",
            "name": "<string> [User author name]",
            "tag": "<string> [User author tag]",
            "createdAt": "<Date> [User author date/time of creation]",
            "updatedAt": "<Date> [User author date/time of last update]"
        },
        "createdAt": "<Date> [Post date/time of creation]",
        "updatedAt": "<Date> [Post date/time of last update]"
    }
]
```

</details>

---

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/likes &nbsp; • &nbsp; Get list of all likes</summary>

### **Request**

```json
"query": {
    "page": "<number integer positive optional default=1> [Page]",
    "per-page": "<number integer positive max=30 optional default=10> [Follows per page]",
    "user-id": "<string optional> [User id]",
    "post-id": "<string optional> [Post id]"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": [
    {
        "id": "<string> [Like id]",
        "user": {
            "id": "<string> [User id]",
            "name": "<string> [User name]",
            "tag": "<string> [User tag]",
            "createdAt": "<Date> [User date/time of creation]",
            "updatedAt": "<Date> [User date/time of last update]"
        },
        "post": {
            "id": "<string> [Post id]",
            "text": "<string> [Post text]",
            "author": {
                "id": "<string> [User author id]",
                "name": "<string> [User author name]",
                "tag": "<string> [User author tag]",
                "createdAt": "<Date> [User author date/time of creation]",
                "updatedAt": "<Date> [User author date/time of last update]"
            },
            "createdAt": "<Date> [Post date/time of creation]",
            "updatedAt": "<Date> [Post date/time of last update]"
        },
        "createdAt": "<Date> [Like date/time of creation]",
    }
]
```

</details>

<details>
<summary><b>GET</b> &nbsp; • &nbsp; /api/likes/:userId/:postId &nbsp; • &nbsp; Get data from a specific like</summary>

### **Request**

```json
"params": {
    "userId": "<string required> [User id]",
    "postId": "<string required> [Post id]"
},
```

### **Response**

**Code** : `200 OK`

```json
"body": {
    "id": "<string> [Like id]",
    "user": {
        "id": "<string> [User id]",
        "name": "<string> [User name]",
        "tag": "<string> [User tag]",
        "createdAt": "<Date> [User date/time of creation]",
        "updatedAt": "<Date> [User date/time of last update]"
    },
    "post": {
        "id": "<string> [Post id]",
        "text": "<string> [Post text]",
        "author": {
            "id": "<string> [User author id]",
            "name": "<string> [User author name]",
            "tag": "<string> [User author tag]",
            "createdAt": "<Date> [User author date/time of creation]",
            "updatedAt": "<Date> [User author date/time of last update]"
        },
        "createdAt": "<Date> [Post date/time of creation]",
        "updatedAt": "<Date> [Post date/time of last update]"
    },
    "createdAt": "<Date> [Like date/time of creation]",
}
```

</details>

<details>
<summary><b>POST</b> &nbsp; • &nbsp; /api/likes :lock: &nbsp; • &nbsp; Create a new like from the user authenticated to a post provided</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"body": {
    "targetId": "<string required> [User target id]",
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": {
    "id": "<string> [Like id]",
    "user": {
        "id": "<string> [User id]",
        "name": "<string> [User name]",
        "tag": "<string> [User tag]",
        "createdAt": "<Date> [User date/time of creation]",
        "updatedAt": "<Date> [User date/time of last update]"
    },
    "post": {
        "id": "<string> [Post id]",
        "text": "<string> [Post text]",
        "author": {
            "id": "<string> [User author id]",
            "name": "<string> [User author name]",
            "tag": "<string> [User author tag]",
            "createdAt": "<Date> [User author date/time of creation]",
            "updatedAt": "<Date> [User author date/time of last update]"
        },
        "createdAt": "<Date> [Post date/time of creation]",
        "updatedAt": "<Date> [Post date/time of last update]"
    },
    "createdAt": "<Date> [Like date/time of creation]",
}
```

</details>

</details>

<details>
<summary><b>DELETE</b> &nbsp; • &nbsp; /api/likes/:id :lock: &nbsp; • &nbsp; Delete a like searching for its id</summary>

### **Request**

```json
"header": {
    "authorization": "<string bearer token required> [Bearer JWT token]"
},

"params": {
    "id": "<string required> [Like id]",
}
```

### **Response**

**Code** : `201 CREATED`

```json

```

</details>
