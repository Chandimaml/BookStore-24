import express from 'express';
import { Book } from '../models/bookmodel.js';
const router = express.Router();

 

 

//router for save new book
router.post('/', async(request,response)=>{
  try{
    if(
      !request.body.title||
      !request.body.author||
      !request.body.publishYear

    ){
      return response.status(400).send({
        message: 'send all required faileds:title,author,published year',
      });
    }
    const newBook ={
      title:request.body.title,
      author:request.body.author,
      publishYear:request.body.publishYear,
    };
    const book = await Book.create(newBook)
    return response.status(201).send(book);

  }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});
  }
});

//Route for get all book from database
router.get('/',async(request,response)=>{
  try{
    const books =await Book.find({});

    return response.status(200).json({
      count : books.length,
      data : books
    });

  }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message})
  }
})

//Route for get one book from database with it ID
router.get('/:id',async(request,response)=>{
  try{
    const { id }= request.params;

    const book= await Book.findById(id);

    return response.status(200).json(book);

  }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message})
  }
})

//Route for update book
router.put('/:id',async(request,response)=>{
  try{
    if(
      !request.body.title||
      !request.body.author||
      !request.body.publishYear

    ){
      return response.status(400).send({
        message: 'send all required faileds:title,author,published year',
      });
    }
    const { id }= request.params;

    const result = await Book.findByIdAndUpdate(id,request.body);

    if (!result){
      return response.status(404).json({message:'Book Not Found'});
    }
    return response.status(200).send({message:'Book is successfully updated!!!'});
  }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message})
  }
})

//Route for delete a book
router.delete('/:id',async (request,response)=>{
  try{

    const { id }= request.params;

    const result = await Book.findByIdAndDelete(id,request.body);

    if (!result){
      return response.status(404).json({message:'Book Not Found'});
    }
    return response.status(200).send({message:'Book is successfully Deleted!!!'});
  }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message})
  }
})

export default router;