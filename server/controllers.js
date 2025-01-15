const pool = require("./db")
const addList = async (req,res) => {
    const {description} = req.body
    try{
        const lists = await pool.query(
            "INSERT INTO todo (description) VALUES($1)",
            [description]
        )

        return res.json({success: true, message: "Added task successfully"})

    }catch(error){
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}

const getList = async (req,res) => {
    try{
        const allLists = await pool.query(
            "SELECT * FROM todo"
        )

        const todo = allLists.rows

        return res.json({success: true, message: todo})

    }catch(error){
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}

const updateList = async (req, res) => {
    const {description}=req.body
    const {id} = req.params
    try{
        if(!id){
            return res.json({success: false, message: "Missing id"})
        }
        const updateList = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        )

        return res.json({success: true, message: "Your task was successfully updated"})

    }catch(error){
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}

const deleteList = async (req,res) => {
    const {id} = req.params
    try{
        if(!id){
            return res.json({success: false, message: "Missing id"})
        }
        const deleteList = await pool.query(
            "DELETE from todo WHERE todo_id = $1",
            [id]
        )
        
        return res.json({success: true, message: "Your task was successfully deleted"})
    }catch(error){
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}

module.exports= {addList, getList, updateList, deleteList}