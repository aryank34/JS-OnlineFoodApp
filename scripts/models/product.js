//Product Model - Blue Print

//Product JS contains the structure of a Pizza/any food object
//Pizza Object - Id, Name, Desc, Price, Rating, Image

class Product{
    constructor(id,name,desc,price,url){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.url = url;
        this.isAddedInCart = false;
        this.count = 0;
    }
}

export default Product;