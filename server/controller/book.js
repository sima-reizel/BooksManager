const express = require('express')
const bodyParser = require('body-parser')
const Book = require('../model/book.model')
const Author = require('../model/author.model')
const { ObjectId } = require('mongoose');
const multer = require('multer')
const upload = multer({dest: 'uploads'})

async function get(req, res){
    try {
        const books = await Book.find()
        res.status(200).send(books)
    } catch (error) {
        console.error('Error fetching books:', error)
        res.status(500).send('Internal Server Error')
    }
}

async function post(req, res) {
    try {
        req.body.img =  req.body.img.replace(/^.*\\fakepath\\/, '')
        const { author }  = req.body ?? {}
        const isAuthorExist = await Author.findOne({name:author})
        if (!isAuthorExist) {
            throw new Error('Author is not exist')
        }
        const newBook = await Book.create({...req.body, status: isAuthorExist.status})
        await newBook.save()

        isAuthorExist.listOfBooks.push(req.body.title)
        
        await isAuthorExist.save()

        res.status(201).send(req.body)

    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            res.status(400).json({ message: 'Book with the same name already exists.' })
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message })
        } else {
            console.error('Error adding new book:', error)
            res.status(500).send('Internal Server Error')
        }
    }
}

exports.get = get
exports.post = post