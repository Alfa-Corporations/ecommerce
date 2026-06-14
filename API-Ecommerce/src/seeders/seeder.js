const db = require("../utils/database");
const initModels = require("../models/initModels");
const { Cart, Users, Roles, Categories, Products } = require("../models");

initModels();

const roles = [
    { name: "Admin", description: "Admin of the Ecommerce" },
    { name: "User", description: "Client of the Ecommerce" }
]

const users = [
    { firstName: "Luis", lastName: "Uzcategui",isVerify: true, email: "alfonsouzcategui2@gmail.com", phoneNumber: "+593979010717", password: "123123", roleId: 1 },
    { firstName: "John", lastName: "Doe",isVerify: true, email: "john@gmail.com", phoneNumber: "0123456789", password: "john1234" },
]

const carts = [
    { userId: 1, totalPrice: 0, status: "empty" },
    { userId: 2, totalPrice: 0, status: "empty" }
]

const categories = [
    { name: "Hats" },
    { name: "Outfit" },
    { name: "Shirts" },
    { name: "Shoes" },
    { name: "Tecnology" }
]

const products = [
    { title: "Hat yellow Jordan", description: "This is a new Jordan hat", categoryId: 1, price: 25.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/gorro-amarillo-jordan-23.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/gorro-amarillo-jordan-23-1.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Black hat Thung life", description: "This is a new black hat Thung life", categoryId: 1, price: 35.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/gorro-negro-thug-life.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/gorro-negro-thug-life-1.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Pink hat Pineapple", description: "This is a new pink hat Pineapple", categoryId: 1, price: 32.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/gorro-rosa-pina.png?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/gorro-rosa-pina-1.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Chandal black and white outfit", description: "This is a new outfit Chandal", categoryId: 2, price: 45.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/conjunto-chandal-negro-con-rayas-blancas.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/conjunto-chandal-negro-con-rayas-blancas-1.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Chandal black and pink outfit", description: "This is a new outfit Chandal", categoryId: 2, price: 45.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/conjunto-chandal-negro-y-rosa.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/conjunto-chandal-negro-y-rosa-1.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/conjunto-chandal-negro-y-rosa-2.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Shirt gray", description: "This is a new shirt gray", categoryId: 3, price: 65.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/sudadera-gris-con-capucha.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/sudadera-gris-con-capucha-1.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/sudadera-gris-con-capucha-2.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/sudadera-gris-con-capucha-3.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Red Shirt", description: "This is a new shirt gray", categoryId: 3, price: 62.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/sudadera-roja-con-capucha.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/sudadera-roja-con-capucha-1.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/sudadera-roja-con-capucha-2.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/sudadera-roja-con-capucha-3.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Converce All Star Black", description: "This is a New shoes Converce", categoryId: 4, price: 45.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/converse-all-star-negras-bajas.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/converse-all-star-negras-bajas-1.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/converse-all-star-negras-bajas-2.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/converse-all-star-negras-bajas-3.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Converce All Star Plataforma", description: "This is a New shoes Converce", categoryId: 4, price: 68.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/converse-all-star-plataforma-blancas.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/converse-all-star-plataforma-blancas-1.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/converse-all-star-plataforma-blancas-2.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Converce Run Star", description: "This is a New shoes Converce run star hike low top White", categoryId: 4, price: 75.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/converse-run-star-hike-low-top-blancas.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/converse-run-star-hike-low-top-blancas-1.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/converse-run-star-hike-low-top-blancas-2.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/converse-run-star-hike-low-top-blancas-3.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Nike Air Jordan", description: "This is a New shoes Nike Air Jordan low blue", categoryId: 4, price: 55.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/nike-air-jordan-1-bajas-azules.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/nike-air-jordan-1-bajas-azules-1.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/nike-air-jordan-1-bajas-azules-2.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "Vans Old Skool", description: "This is a New shoes Vans  Old Skool Cuadros", categoryId: 4, price: 55.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/vans-plataforma-old-skool-cuadros.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/vans-plataforma-old-skool-cuadros-1.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "USB Apple", description: "This is a New USB", categoryId: 5, price: 25.5, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/cargador-usb-apple.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/cargador-usb-apple-1.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "USB Type C", description: "This is a New USB", categoryId: 5, price: 28.5, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/cargador-usb-tipo-c.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/cargador-usb-tipo-c-1.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/cargador-usb-tipo-c-2.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "SmartWatch White", description: "This is a New SmartWatch", categoryId: 5, price: 150.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/smartwatch-blanco.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/smartwatch-blanco-1.jpg?raw=true"], stock: 20, userId: 1 },
    { title: "SmartWatch Black", description: "This a New SmartWatch", categoryId: 5, price: 100.0, status: "active", productImgs: ["https://github.com/Glya-Corporation/galery-e/blob/main/smartwatch-negro.jpg?raw=true","https://github.com/Glya-Corporation/galery-e/blob/main/smartwatch-negro-1.jpg?raw=true"], stock: 20, userId: 1 }
]

db.sync({ force: true })
    .then(() => {
        console.log("Iniciando la plantación de Información");
        roles.forEach(role => Roles.create(role));
        categories.forEach(category => Categories.create(category));
        setTimeout(() => {
            users.forEach(user => Users.create(user));
        }, 1000);
        setTimeout(() => {
            carts.forEach(cart => Cart.create(cart));
        }, 3000);
        setTimeout(() => {
            products.forEach(product => Products.create(product));
        }, 4000);
    })
    .catch((error) => console.log(error))
    .finally(() => console.log("Implantation complete"))