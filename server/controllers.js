const {pool} = require("./db");

const addList = async (req, res) => {
  const { description } = req.body;
  try {
    const lists = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    return res.status(201).json({
      success: true,    
      message: "Task added successfully",
      data: lists.rows[0],
    });
  } catch (error) {
    console.error("Error adding task:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the task",
      error: error.message,
    });
  }
};

const getList = async (req, res) => {
  try {
    const allLists = await pool.query("SELECT * FROM todo ORDER BY todo_id DESC");

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: allLists.rows,
    });
  } catch (error) {
    console.error("Error retrieving tasks:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving tasks",
      error: error.message,
    });
  }
};

const updateList = async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    const result = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the task",
      error: error.message,
    });
  }
};

const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    const result = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the task",
      error: error.message,
    });
  }
};

const isCompleted = async (req, res) => {
    try {
      const {id} = req.params
      const list = await pool.query("SELECT completed FROM todo WHERE todo_id= $1",[id])
      
     const updatedData = await pool.query("UPDATE todo SET completed = $1 WHERE todo_id = $2 RETURNING *",
      [!list.rows[0].completed,id])
  
      return res.status(200).json({
        success: true,
        message: "Completed",
        data: updatedData.rows
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating tasks",
        error: error.message,
      });
    }
  };

module.exports = { addList, getList, updateList, deleteList, isCompleted };
