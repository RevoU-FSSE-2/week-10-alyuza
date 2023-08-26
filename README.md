# Week 10 Assignment

- Node.js & Express.js
- Swagger UI
- Postman
- MongoDB

## FEATURES
* Authentication
    - Register
    - Login to get JsonWebToken for authorization
* Transfer
    - Create a transfer (Role: all users)
    - List all transfer history (Role: all users)
    - Update transfer status [Approve / Reject] (Role: Approver)

**Available Account**
```
{
    "username" : "yuza.user",
    "password" : "yuza1234",
    "role" : "maker"
}
```
```
{
  "username": "yuza.approver",
  "password": "yuza1234"
  "role": "approver"
}
```
## API ENDPOINTS
| Name                                | HTTP Methods| EndPoints                 | 
|-----------------------|-------------|-------------|---------------------------|
|**Register User**                    |`POST`       |/auth/register             |
| **Login User**                      | `POST`      | /auth/login               |
| **List All Transfer**               | `GET`       | /transfers/               |
| **Create Transfer**                 | `POST`      |/transfers/money           |
| **Update Transfer Status by ID**    | `PATCH`     |/transfers/{transferId}    |
## MongoDB
<img src="img/img1.png" alt="mongoDB" width="750px">

## Swagger UI
<img src="img/img2.png" alt="swagger UI" width="750px">

## OpenAPI Documentation & Router
<img src="img/img3.png" alt="openAPI documentation" width="750px">

## CONTACT ME
[![Linkedin Badge](https://img.shields.io/badge/-Alyuza_Satrio_Prayogo-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/alyuzasp/) [![Youtube Badge](https://img.shields.io/badge/-Alyuza_Satrio_Prayogo-darkred?style=flat-square&logo=youtube&logoColor=white)](https://www.youtube.com/@alyuza/about) [![Instagram Badge](https://img.shields.io/badge/-Alyuza_Satrio_Prayogo-black?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/alyuuza/)