# Product App with node.js and MongoDb

This app is a test product app that has a clear user interface that is aimed to implement CRUD operations with the MongoDB database and node.js.


## Getting Started

```
git clone https://github.com/Kivanc10/Product-app-with-node.js-and-mongodb.git

cd Product-app-with-node.js-and-mongodb

docker-compose build

docker-compose up
```

- You can look at the container features with `docker ps -a`
- At last, the application is available on port 8080. Navigate to `http://localhost:8080/`

## Informing about the Using

Finally, you have the app that is running at `http://localhost:8080/`. It provides us following endpoints

 - `GET /` : It provides the main page of the app. Users can both add a product here and list all products that have been added
 
 - `POST /product` : It allows users to add product by name and price fields to database
    - If you use Postman,your request body should be looks like that:
        - `{
                "name" : "Computer",
                "price" : 2500
                }`

 - `POST /product/avatar/:id` : It allows users to upload an image for a specific product that by its id.

 - `GET /product/update/avatar/:id` : It routes you to page updates of the avatar of the product. You can update your product avatar here its id.  
 - `GET /products` : It lists all products saved.
 - `GET /product-list` : It lists all products with a clear interface. It also allows users to update and delete these products easily.
 - `GET /product/:id` : It returns the specific product as database result based on its id.
 - `GET /products/:id/image` : It returns the image of spesific product based on its id.
 - `GET /product/update/:id` :  It routes you to the update page of the product by its id. Users can update the name and price fields of the product
 - `GET /product/delete/:id` : It routes you to delete page of the product by its id. You can delete the product easily by click the delete button.
 - `PATCH /product/update/:id` : Users can update fields of product which are `name` and `price`. 
    - You can list all products by get request to `product-list` , then update the product by click the update button.
    - Or you use Postman, your request body should be looks like this:
        - `{
                "name" : "Computer",
                "price" : 2500
                }`
 - `DELETE /product/delete/:id` : Users can delete the products by this request easily.
    - You can list all products by get request to `product-list` ,then delete the product by click the delete button.              
