const express = require("express")
const {addList,getList, updateList, deleteList, isCompleted } = require("./controllers")

const router = express.Router()
router.post('/addList',addList)
router.get('/getList', getList)
router.put('/updateList/:id', updateList)
router.delete('/deleteList/:id', deleteList)
router.put('/isCompleted/:id', isCompleted)

module.exports = router;