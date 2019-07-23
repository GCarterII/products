const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
//const AutoIncrementFactory = require('mongoose-sequence');
const AutoIncrement = require('mongoose-sequence')(mongoose)
const port = 9120;
var app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true });
app.use(express.static(__dirname + '/public/dist/public'));

// 
// helpers
// 

function printHelper(data){
    console.log('****************************************************');
    console.log(data);
    console.log('****************************************************')
}

//
// schemas
//

var ProductSchema = new mongoose.Schema({
    _id: Number,
    name: {type: String, required: [true, "Please insert a name for this product."], minlength: [3, "Comeon... its name must be longer that THAT...right?"]},
    quantity: {type: Number, required: [true, "Please enter a quantity."], min: [0, "You cannot have nagative inventory!"]},
    price: {type: Number, required: [true, "Product must contain a price."], min: [0, "Product cannot me less than free!"]},
    createdAt : {type: Date, default: Date},
    updatedAt: {type: Date, default: Date.now()},
}, { _id: false});
ProductSchema.plugin(AutoIncrement)
//, {inc_field: 'id'}
mongoose.model('product', ProductSchema);
var Product = mongoose.model('product');

//
// routing
//

app.get('/asdf', (req, res) =>{
    Review.find({}, (err, all_products) =>{
        if(err){
            printHelper("get all products error!");
            printHelper(err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: all_products})
        }
    })
})


// app.post('/productsList/:id/review', (req, res) =>{
//     newReview = new Review(req.body);
//     printHelper(req)
//     newReview.save()
//     .then(
//         Product.findByIdAndUpdate(req.params.id, {$push : {reviews : req.body }},{runValidators: true, new: true})
//         .then( task => { res.json({ "Message": "Success", 'task': task}), newReview.delete()})
//         .catch( err => { res.json({ "Message": "Error", "err": err }) })
//     )
//     .catch(err => { res.json({ "Message": "Error", "err": err }) })
// })

// app.post('/tasks/:id/review', (req, res) => {
//     Task.findByIdAndUpdate(req.params.id, {$push : {reviews : req.body }})
//     .then( task => { res.json({ "Message": "Success", 'task': task }) })
//     .catch( err => { res.json({ "Message": "Error", "err": err }) })  
// })


app.get('/productsList/:id', (req, res) =>{
    Product.find({_id: req.params.id})
    //     (err, product) =>{
    //     if(err){
    //         printHelper("get 1 product error!")
    //         printHelper(err)
    //         res.json({message: "Error", error: err})
    //     } else {
    //         res.json({message: "Success", data: product})
    //     }
    // })
    .then ( product => { res.json({message: "Success", data: product}) })
    .catch ( err => { res.json({message: "Error", error: err}) })
})

app.get('/productsList', (req, res) =>{
    Product.find({}, (err, all_products) =>{
        if(err){
            printHelper("get all products error!");
            printHelper(err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: all_products})
        }
    })
})

app.post('/productsList', (req, res) =>{
    var product = new Product(req.body);
    printHelper(req.body.name)
    product = product.save((err) =>{
        if(err){
            printHelper("make new product error!");
            printHelper(err);
            res.json({message: "Error", error: err})
        } else { res.json({message: "Success", Product})}
    })

    // Product.find({name: req.body.name}, (err, data)=>{ // ***REQUIRES unique name***
    //     if(data){ 
    //         console.log("data");
    //         printHelper(data);
    //         if(data[0] && data[0].name){
    //             printHelper("already exists!");
    //             res.json({message: "Error", error: {errors: {name: {message: "Product already exists!"}}}})
    //         } else{                                     // ***CREATES new item if name unique***
    //             product = product.save((err) =>{
    //                 if(err){
    //                     printHelper("make new product error!");
    //                     printHelper(err);
    //                     res.json({message: "Error", error: err})
    //                 } else { res.json({message: "Success", Product})}
    //             })
    //         }
    // }
    // })
})

app.put('/productsList/:id', (req, res) =>{
    req.body.updatedAt = Date.now();
        Product.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, data) =>{
            if(err){
                printHelper("update product error!");
                printHelper(err)
                res.json({message: "Error", error: err});
            } else {res.json({message: "Success", data: data})}
        })
    // Product.find({name: req.body.name}, (err, data)=>{ // ***REQUIRES unique name***
    //     if(data){
    //         console.log("data");
    //         printHelper(data);
    //         if(data[0] && data[0].name){
    //             printHelper("already exists!");
    //             res.json({message: "Error", error: {errors: {name: {message: "Product already exists!"}}}})
    //         } else{                                 // ***CREATES new item if name unique***
    //             Product.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true}, (err, data) =>{
    //                 if(err){
    //                     printHelper("update product error!");
    //                     printHelper(err)
    //                     res.json({message: "Error", error: err});
    //                 } else {res.json({message: "Success", data: data})}
    //             })
    //         }
    //     }
    // })
})

app.delete('/productsList/:id', (req, res) =>{
    Product.deleteOne({_id: req.params.id}, (err) =>{
        if(err){
            printHelper("deleting product error!");
            printHelper(err);
            res.json({message: "Error", error: err});
        } else {res.json({message: "Success"})}
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

//
//Server Port
//
app.listen(port, function() {
    console.log("listening on port: ",port);
})