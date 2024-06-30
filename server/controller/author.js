const express = require('express')
const bodyParser = require('body-parser')
const Author = require('../model/author.model')
const Book = require('../model/book.model')

async function get(req, res){
    try {
        const authors = await Author.find()
        res.status(200).send(authors)
    } catch (error) {
        console.error('Error fetching authors:', error)
        res.status(500).send('Internal Server Error')
    }
}

async function post(req, res) {
    try {
        req.body.img =  req.body.img.replace(/^.*\\fakepath\\/, '')
        const newAuthor = await Author.create(req.body)
        await newAuthor.save()
        res.status(201).send(req.body) 
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            res.status(400).send({ message: 'Author with the same name already exists.' });
        } else if (error.name === 'ValidationError') {
            res.status(400).send({ message: error.message });
        } else {
            console.error('Error adding new author:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

async function editStatus (req,res)  {
    try {
        let author = await Author.findOne({name:req.body.name})
        author.status = req.body.status
        await author.save()
        await Book.updateMany(
            { title: { $in: author.listOfBooks } },
            { $set: { status: author.status } } 
        )
        res.status(201).send(req.body) 
    }
    catch (error) {
           if (error.name === 'ValidationError') {
                res.status(400).send({ message: error.message });
            } else {
                console.error('Faild to edit author:', error);
                res.status(500).send('Internal Server Error');
            }
    }
}

exports.get = get
exports.post = post
exports.editStatus = editStatus