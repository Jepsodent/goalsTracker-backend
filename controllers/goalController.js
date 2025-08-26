import mongoose from "mongoose";
import Goal from "../models/Goal.js";


// POST /api/goal/create (protected route-> user)
export const createGoals = async (req, res ) => {
    try {
        const {userId} = req
        const {title, description} = req.body;
        if(!title){
            return res.json({success:false, message: "Title Required"});
        }
        const newGoal = await Goal.create({
            title,
            description,
            userId
        });

        const {userId: _ , ...responseGoal} = newGoal.toObject();

        res.json({success:true, message: "Goal Created Successfully", goal: responseGoal});
    } catch (error) {
        res.json({success:false, message:error.message});
        
    }
}

// GET /api/goal -> protected route for user
export const getGoals = async (req, res) => {
    try {
        const {userId} = req;    
        const goals = await Goal.find({userId});
        if(!goals || goals.length === 0) {
            return res.json({success:false, message: "You haven't created any goals yet", goals: []});
        } 
        const responseGoal = goals.map((goal ) => {
            const {userId:_ , ...responseGoal} = goal.toObject();
            return responseGoal;
        })
        res.json({success:true, goal: responseGoal});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
} 

// GET /api/goal/:id -> for spesific goals (protected route for user)
export const getDetailGoals = async (req, res )=> {
    try {
        const {id} = req.params;
        const {userId} = req;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.json({success:false, message: "ID required"});
        }
        const goal = await Goal.findOne({_id: id, userId});
        if(!goal){
            return res.json({success:false, message:"No goal with this id"});
        }
        const {userId:_ , ...responseGoal} = goal.toObject();
        res.json({success:true, goal: responseGoal});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
};

// PUT / api/goal/:id

export const updateGoal = async (req, res ) => {
    try {
        const {userId} = req;
        const {title, description, isComplete} = req.body;
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.json({success:false, message:"ID required"});
        }
        const updatedGoal = await Goal.findOneAndUpdate({_id: id, userId}, {
            title, description , isComplete
        }, {new: true, runValidators: true});

        if(!updatedGoal){
            return res.json({success:false, message: "Goal not found"});
        } 
        const {userId:_ , ...responseGoal} = updatedGoal.toObject();
        res.json({success:true, message:"Goal Successfully updated", goal: responseGoal});
        
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}


//DELETE /api/goal/:id
export const deleteGoal = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.json({success:false, message: "ID required"});
        }
        const deletedGoal = await Goal.findOneAndDelete({_id:id, userId});
        if(!deletedGoal){
            return res.json({success:false, message: "Goal not found"});
        }
        res.json({success:true, message: "Goal successfully deleted"});
    } catch (error) {
        res.json({success:false, message: error.message});
    }

}