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

<details>
<summary><span style="display: inline-block; width: 60px; font-weight: bold;">GET</span><span style="display: inline-block; width: 250px;">/api/users?page=#</span>Get list of users</summary>
<hr />

### **Request**

```json
"params": {
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
<hr />
<details>
<summary><span style="display: inline-block; width:60px; font-weight: bold;">POST</span><span style="display: inline-block; width: 250px;">/api/users</span>Create a new user</summary>

### **Request**

```json
"body": {
    "email": "<string email max(50) required>",
    "name": "<string max(50) required>",
    "tag": "<string alphanum max(30) required>",
    "password": "<string max(30) required>"
}
```

### **Response**

**Code** : `201 CREATED`

```json
"body": [
    {
        "email": "<string>",
        "name": "<string>",
        "tag": "<string>",
        "createdAt": "<Date>"
    }
]
```

</details>
