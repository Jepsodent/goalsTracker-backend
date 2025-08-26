import Goal from "../models/Goal";


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

// GET /api/goals -> protected route for user
export const getGoals = async (req, res) => {
    try {
        const {userId} = req;    
        const goals = await Goal.find({userId});
        if(!goals || goals.length === 0) {
            return res.json({success:false, message: "You haven't created any goals yet", goals: []});
        }
        res.json({success:true, goals});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
} 

// GET /api/goals/:id -> for spesific goals (protected route for user)
export const getDetailGoals = async (req, res )=> {
    try {
        const {id} = req.params;
        const {userId} = req;
        if(!id){
            return res.json({success:false, message: "ID required"});
        }
        const goal = await Goal.findOne({_id: id, userId});
        if(!goal){
            return res.json({success:false, message:"No goal with this id"});
        }
        res.json({success:true, goal});
    } catch (error) {
        res.json({success:false, message: error.message});
    }
};

