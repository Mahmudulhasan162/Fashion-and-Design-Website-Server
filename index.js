const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tbshjw2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const productCollection = client.db('productDATA').collection('products')

    const brandCollection = client.db('brandData').collection('brands')

    const cartProducts = client.db('cartData').collection('cart')

    const defaultProducts = [
        {
          name: 'Zara Men Cotton Full Sleeve Shirt',
          brand: 'Zara',
          type: 'Casual Shirt',
          photo: 'https://i.ibb.co/tZK2003/Zara-Men-Cotton-Full-Sleeve-Shirt.jpg',
          price: 29.99,
          description: 'Comfortable and stylish casual shirt for everyday wear.',
          rating: 4.5
        },
        {
          name: 'Nike Air Zoom Pegasus Running Shoes',
          brand: 'Nike',
          type: 'Running Shoes',
          photo: 'https://i.ibb.co/KmtzrG2/Nike-Air-Zoom-Pegasus-Running-Shoes.jpg',
          price: 99.99,
          description: 'High-performance running shoes for your active lifestyle.',
          rating: 4.8
        },
        {
          name: "Levi's Skinny Fit Stretch Jeans",
          brand: "Levi's",
          type: 'Skinny Jeans',
          photo: 'https://i.ibb.co/Ms2fLB8/Levi-s-Skinny-Fit-Stretch-Jeans.jpg',
          price: 49.99,
          description: 'Trendy skinny jeans that fit perfectly for a modern look.',
          rating: 4.2
        },
        {
          name: 'H&M Floral Print Summer Dress',
          brand: 'H&M',
          type: 'Summer Dress',
          photo: 'https://i.ibb.co/P1Vq4gF/H-M-Floral-Print-Summer-Dress.jpg',
          price: 39.99,
          description: 'Flowy and vibrant summer dress for a day out in the sun.',
          rating: 4.7
        },
        {
          name: 'Adidas Originals Superstar Sneakers',
          brand: 'Adidas',
          type: 'Sneakers',
          photo: 'https://i.ibb.co/Q9XFfmG/Adidas-Originals-Superstar-Sneakers.jpg',
          price: 79.99,
          description: 'Classic sneakers with a timeless design for casual occasions.',
          rating: 4.6
        },
        {
          name: 'Gucci Leather Biker Jacket',
          brand: 'Gucci',
          type: 'Leather Jacket',
          photo: 'https://i.ibb.co/YtK7PZP/Gucci-Leather-Biker-Jacket.jpg',
          price: 199.99,
          description: 'Stylish leather jacket to add an edge to your outfit.',
          rating: 4.9
        },
        {
          name: 'Zara Men Formal Cotton Shirt',
          brand: 'Zara',
          type: 'Formal Shirt',
          photo: 'https://i.ibb.co/fHmDPzM/Zara-Men-Formal-Cotton-Shirt.jpg',
          price: 59.99,
          description: 'Crisp and tailored formal shirt for professional settings.',
          rating: 4.4
        },
        {
          name: 'Nike LeBron Witness Basketball Shoes',
          brand: 'Nike',
          type: 'Basketball Shoes',
          photo: 'https://i.ibb.co/MDpbPnM/Nike-Le-Bron-Witness-Basketball-Shoes.jpg',
          price: 129.99,
          description: 'High-top basketball shoes for a comfortable and supportive fit.',
          rating: 4.7
        },
        {
          name: "Levi's Denim Casual Shorts",
          brand: "Levi's",
          type: 'Denim Shorts',
          photo: 'https://i.ibb.co/HPNDW0f/Levi-s-Denim-Casual-Shorts.jpg',
          price: 34.99,
          description: 'Casual denim shorts for a laid-back and cool look.',
          rating: 4.3
        },
        {
          name: 'H&M Sequined Cocktail Dress',
          brand: 'H&M',
          type: 'Cocktail Dress',
          photo: 'https://i.ibb.co/y0sWwNN/H-M-Sequined-Cocktail-Dress.jpg',
          price: 89.99,
          description: 'Elegant cocktail dress for special occasions and events.',
          rating: 4.6
        },
        {
          name: 'Adidas Adilette Comfort Sandals',
          brand: 'Adidas',
          type: 'Sandals',
          photo: 'https://i.ibb.co/QJvfqNb/Adidas-Adilette-Comfort-Sandals.webp',
          price: 49.99,
          description: 'Stylish and comfortable sandals for warm-weather days.',
          rating: 4.5
        },
        {
          name: 'Gucci Belted Trench Coat',
          brand: 'Gucci',
          type: 'Trench Coat',
          photo: 'https://i.ibb.co/SKQDztr/Gucci-Belted-Trench-Coat.webp',
          price: 249.99,
          description: 'Classic trench coat for a sophisticated and polished appearance.',
          rating: 4.9
        },
        {
          name: 'Zara Men Cotton Polo Shirt',
          brand: 'Zara',
          type: 'Polo Shirt',
          photo: 'https://i.ibb.co/3dYnFJh/Zara-Men-Cotton-Polo-Shirt.jpg',
          price: 44.99,
          description: 'Versatile polo shirt for a smart-casual style.',
          rating: 4.3
        },
        {
          name: 'Nike Sculpt Victory Yoga Pants',
          brand: 'Nike',
          type: 'Yoga Pants',
          photo: 'https://i.ibb.co/PmyZFgr/Nike-Sculpt-Victory-Yoga-Pants.jpg',
          price: 59.99,
          description: 'Stretchy and breathable yoga pants for your workout sessions.',
          rating: 4.5
        },
        {
          name: "Levi's Sherpa-Lined Winter Jacket",
          brand: "Levi's",
          type: 'Winter Jacket',
          photo: 'https://i.ibb.co/y66DP73/Levi-s-Sherpa-Lined-Winter-Jacket.jpg',
          price: 79.99,
          description: 'Insulated winter jacket to keep you warm in cold weather.',
          rating: 4.8
        },
        {
          name: 'Adidas Adilette Cloudfoam Flip Flops',
          brand: 'Adidas',
          type: 'Flip Flops',
          photo: 'https://i.ibb.co/Mgxrndt/Adidas-Adilette-Cloudfoam-Flip-Flops.jpg',
          price: 29.99,
          description: 'Casual flip flops for a relaxed and beach-ready look.',
          rating: 4.2
        },
        {
          name: 'Gucci Wool Blend Formal Blazer',
          brand: 'Gucci',
          type: 'Blazer',
          photo: 'https://i.ibb.co/rcmVLd1/Gucci-Wool-Blend-Formal-Blazer.webp',
          price: 179.99,
          description: 'Tailored blazer for a polished and sophisticated ensemble.',
          rating: 4.8
        },
        {
          name: 'Nike Sportswear Track Pants',
          brand: 'Nike',
          type: 'Track Pants',
          photo: 'https://i.ibb.co/y8bk9dX/Nike-Sportswear-Track-Pants.webp',
          price: 49.99,
          description: 'Comfortable track pants for a sporty and casual style.',
          rating: 4.4
        },
        {
          name: 'H&M Bohemian Maxi Dress',
          brand: 'H&M',
          type: 'Maxi Dress',
          photo: 'https://i.ibb.co/F3Fq1yF/H-M-Floral-Print-Summer-Dress.jpg',
          price: 69.99,
          description: 'Flowing maxi dress for a bohemian and feminine touch.',
          rating: 4.7
        },
        {
          name: 'Adidas Originals Chelsea Boots',
          brand: 'Adidas',
          type: 'Ankle Boots',
          photo: 'https://i.ibb.co/rZdk4xP/Adidas-Originals-Chelsea-Boots.webp',
          price: 119.99,
          description: 'Stylish ankle boots to elevate your autumn and winter outfits.',
          rating: 4.6
        },
        {
          name: 'Zara Men Hooded Sweatshirt',
          brand: 'Zara',
          type: 'Hoodie',
          photo: 'https://i.ibb.co/tBxcyz6/Zara-Men-Hooded-Sweatshirt.jpg',
          price: 54.99,
          description: 'Cozy hoodie for a relaxed and comfortable vibe.',
          rating: 4.3
        },
        {
          name: "Levi's Slim Fit Chinos",
          brand: "Levi's",
          type: 'Chinos',
          photo: 'https://i.ibb.co/ByWMq2K/Levi-s-Slim-Fit-Chinos.jpg',
          price: 39.99,
          description: 'Classic chinos for a versatile and timeless look.',
          rating: 4.5
        },
        {
          name: 'Nike Essential Rain Jacket',
          brand: 'Nike',
          type: 'Rain Jacket',
          photo: 'https://i.ibb.co/GsbnhsQ/Nike-Essential-Rain-Jacket.webp',
          price: 89.99,
          description: 'Waterproof rain jacket for staying dry during rainy days.',
          rating: 4.7
        },
        {
          name: 'Gucci Formal Dress Shirt',
          brand: 'Gucci',
          type: 'Formal Dress Shirt',
          photo: 'https://i.ibb.co/sWNjr97/Gucci-Formal-Dress-Shirt.webp',
          price: 69.99,
          description: 'Crisp and formal dress shirt for professional and formal occasions.',
          rating: 4.6
        }
      ];
    
      defaultProducts.forEach(async (product)=>{
        const {name, brand} = product;
        const count = await productCollection.countDocuments({name, brand});
        if(count === 0){
            await productCollection.insertOne(product);
        }
      })

      const brandData = [
        {
          "id": 1,
          "brand_name": "Nike",
          "brand_picture": "https://i.ibb.co/PcBHRvW/F-19-NIKE.jpg"
        },
        {
          "id": 2,
          "brand_name": "Adidas",
          "brand_picture": "https://i.ibb.co/y60w5jb/Adidas-logo.webp"
        },
        {
          "id": 3,
          "brand_name": "Gucci",
          "brand_picture": "https://i.ibb.co/0CJgpmG/gucci.webp"
        },
        {
          "id": 4,
          "brand_name": "Zara",
          "brand_picture": "https://i.ibb.co/NghZ1rC/6d2ccd795e409bb68eec5db364e797ef.jpg"
        },
        {
          "id": 5,
          "brand_name": "H&M",
          "brand_picture": "https://i.ibb.co/MhLvRMR/image.jpg"
        },
        {
          "id": 6,
          "brand_name": "Levi's",
          "brand_picture": "https://i.ibb.co/3MLGGXn/31581.png"
        }
      ]

      brandData.forEach(async (brand)=>{
        const {brand_name} = brand;
        const count = await brandCollection.countDocuments({brand_name});
        if(count === 0){
        await brandCollection.insertOne(brand);
        }
      })

      app.get("/brands", async(req, res)=>{
        const cursor = brandCollection.find();
        const result = await cursor.toArray();
        console.log(result);
        res.send(result);
      })

    app.get("/products", async(req, res)=>{
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    app.get("/products/:id", async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await productCollection.findOne(query);
      res.send(result);
    })

    app.post("/products", async(req, res)=>{
        const newProducts = req.body;
        console.log(newProducts);
        const result= await productCollection.insertOne(newProducts);
        res.send(result)
    })

    app.post("/cart", async(req, res)=>{
      const cart = req.body;
      console.log(cart);
      const result= await cartProducts.insertOne(cart);
      res.send(result);
    })
    app.get("/cart", async(req, res)=>{
      const cursor = cartProducts.find();
      const result = await cursor.toArray();
      res.send(result);
  })

    app.delete("/cart/:id", async(req, res)=>{
      const id = req.params.id;
      const query = {_id: id}
      const result = await cartProducts.deleteOne(query);
      res.send(result);
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Fashion Brand Server is running...");
  });

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
  });

