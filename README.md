# **Flat Sharing Server**

Welcome to the **Flat Sharing Server** project! This repository contains the server-side code for our Flat Sharing Server. This README file provides guidelines on how to build and contribute to the project as a team. Please make sure to follow these instructions to maintain a consistent and efficient development process.

## **Getting Started**

1. **Clone the Repository:**
    
    ```bash
    git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-Rakibhasaniu.git
    ```
    
2. **Navigate to the Project Directory:**
    
    ```bash
    cd flat-sharing
    ```
    
3. Please update the filename from `.env.example` to `.env`
4. **Install Dependencies:**
    
    ```bash
    yarn install
    ```
    
5. **Start the Server:**
    
    ```bash
    yarn start:dev
    ```
    
    The server will be running at **`http://localhost:5000`** .
    




To create new Course you have to send course data in courseData object( shown below) via create Course endPoint:

1. *User Registration*
*Endpoint: POST (http://localhost:5000/api/register)*
Request Body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456",
  "bio":"My Bio",
  "profession":"Developer",
  "address":"Permanent Address"
}
Response :
{
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bvf",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
    }
}
        

2. *User Login*
*Endpoint: POST (http://localhost:5000/api/login)*
Request Body:
{
    "email": "john@example.com",
    "password": "password"
}
Response:
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bvf",
        "name": "John Doe",
        "email": "john@example.com",
        "token": "<JWT token>",
    }
}
3.*Add a Flat*
*Endpoint: POST (http://localhost:5000/api/flats)*
Request Headers:
Authorization: <JWT_TOKEN>
Request Body:
{
    "squareFeet": 1200,
    "totalBedrooms": 2,
    "totalRooms": 4,
    "utilitiesDescription": "Includes water and electricity",
    "location": "123 Main Street, Cityville",
    "description": "Cozy apartment with ample natural light and modern amenities.",
    "rent": 1500,
    "advanceAmount": 2000
}
Response:
{
    "success": true,
    "statusCode": 201,
    "message": "Flat added successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016ghs",
        "squareFeet": 1200,
        "totalBedrooms": 2,
        "totalRooms": 4,
        "utilitiesDescription": "Includes water and electricity",
        "location": "123 Main Street, Cityville",
        "description": "Cozy apartment with ample natural light and modern amenities.",
        "rent": 1500,
        "availability": true,
        "advanceAmount": 2000,
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
    }
}

4. *Get Paginated and Filtered Flats*
*Endpoint: GET (http://localhost:5000/api/flats)*
Query Parameters for API Requests:

When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

searchTerm: (Optional) Searches for flats based on a keyword or phrase. Only applicable to the following fields: , location, description , utilitiesDescription(searching mode insensitive)

page: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=1

limit: (Optional) Sets the number of items per page. Default is a predefined limit. Example: ?limit=10

sortBy: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: rent, advanceAmount, squareFeet , totalRooms , totalBedrooms

Example: ? sortBy=rent
sortOrder: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc

availability: (Optional) Filters flats based on the availability.

Example: ?availiblity=true
Response:

{
    "success": true,
    "statusCode": 200,
    "message": "Flats retrieved successfully",
    "meta": {
        "total": 20,
        "page": 1,
        "limit": 10
    },
    "data": [
        {
        "id": "b9964127-2924-42bb-9970-60f93c016ghs",
        "squareFeet": 1200,
        "totalBedrooms": 2,
        "totalRooms": 4,
        "utilitiesDescription": "Includes water and electricity",
        "location": "123 Main Street, Cityville",
        "description": "Cozy apartment with ample natural light and modern amenities.",
        "rent": 1500,
        "availability": true,
        "advanceAmount": 2000
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
        },
        // More flats
    ]
}
*5. Update Flat Information*
*Endpoint: PUT (http://localhost:5000/api/flats/:flatId)*
Request Headers:
Authorization: <JWT_TOKEN>
Request Body:
{
    "location": "Shelter ABC"
}
Response:
{
    "success": true,
    "statusCode": 200,
    "message": "Flat information updated successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016ghs",
        "squareFeet": 1200,
        "totalBedrooms": 2,
        "totalRooms": 4,
        "utilitiesDescription": "Includes water and electricity",
        "location": "123 Main Street, Cityville",
        "description": "Cozy apartment with ample natural light and modern amenities.",
        "rent": 1500,
        "availability": true,
        "advanceAmount": 2000
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:05:00Z"
    }
}

6. *Flat Booking Request*
*Endpoint: POST (http://localhost:5000/api/booking-applications)*
Request Headers:
Authorization: <JWT_TOKEN>
Request Body:
{
    "flatId": "b9964127-2924-42bb-9970-60f93c016ghs"
}
Response:
{
    "success": true,
    "statusCode": 201,
    "message": "Booking requests submitted successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
        "flatId": "b9964127-2924-42bb-9970-60f93c016ghs",
        "status":"PENDING",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z" 
    }
}

        
           {
                "title": "FrontEnd Course",
                "instructor": "Rakib Hasan",
                "categoryId": "6576f1bb993c040c92243ca5",
                "price": 4990,
                "tags": [
                    {
                        "name": "Programming",
                        "isDeleted": false
                    },
                    {
                        "name": "Web Development",
                        "isDeleted": false
                    }
                ],
                "startDate": "2024-01-15",
                "endDate": "2024-07-14",
                "language": "Bangla",
                "provider": "IU Academy",
                "durationInWeeks": 26,
                "details": {
                    "level": "Beginner",
                    "description": "Detailed description of the course"
                }
            }
        

7. *Get Booking Requests*
*Endpoint: GET (http://localhost:5000/api/booking-requests)*
Request Headers:
Authorization: <JWT_TOKEN>
Response:
{
    "success": true,
    "statusCode": 200,
    "message": "Booking requests retrieved successfully",
    "data": [
       {
	        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
	        "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
	        "flatId": "b9964127-2924-42bb-9970-60f93c016ghs",
	        "status":"BOOKED",
	        "createdAt": "2024-03-24T12:00:00Z",
	        "updatedAt": "2024-03-24T12:00:00Z" 
        }
        // More adoption applications
    ]
}
*
8. *Update Booking Flat Application Status*
*Endpoint: PUT (http://localhost:5000/api/booking-requests/:bookingId)*
Request Headers:
Authorization: <JWT_TOKEN>
Request Body:
{
    "status": "BOOKED"
}
Response:
{
    "success": true,
    "statusCode": 200,
    "message": "Booking request updated successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
        "flatId": "b9964127-2924-42bb-9970-60f93c016ghs",
        "status":"BOOKED",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z" 
    }
}
9. *Get User Profile*
*Endpoint: GET (http://localhost:5000/api/profile)*
Request Headers:
Authorization: <JWT_TOKEN>
Response:
{
    "success": true,
    "statusCode": 200,
    "message": "User profile retrieved successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "userId":"9b0dadf5-10fd-41d1-8355-80e67c8577y"
        "bio ":"John Doe",
        "profession ": "john@example.com",
        "address":"Permanent address"
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
    }
}

10. *Update User Profile*
*Endpoint: PUT (http://localhost:5000/api/profile)*
Request Headers:
Authorization: <JWT_TOKEN>
Request Body:
{ "bio":"My Bio" }
Response:
{
    "success": true,
    "statusCode": 200,
    "message": "User profile updated successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "userId":"9b0dadf5-10fd-41d1-8355-80e67c8577y",
        "bio":"My Bio",
        "profession ": "john@example.com",
        "address":"Permanent address",
        "createdAt": "2024-03-24T12:00:00Z",
        "updatedAt": "2024-03-24T12:00:00Z"
    }
}
This endpoint allows users to update their profile information such as bio, profession, address