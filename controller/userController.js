
import User from '../model/userModel.js';
//post request to create a user
export const create=async (req, res) => {
  try {
    const userData= new User(req.body);
    const {email}=req.body;
    const userExist=await User.findOne({email});
    if(userExist){
      return res.status(400).json({error: "User already exists"});
    }
    const savedUser=await userData.save();
    res.status(200).json(savedUser);

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//get all users
export const fetch=async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ errorL: "Internal Server Error" });
  }
}
//put request to update a user
export const update=async (req, res) => {
  try {
    const  {id}  = req.params;
    const userExist= await User.findOne({_id:id});
    if(!userExist){
      return res.status(404).json({message: "User not found"});
    }
   const updateUser= await User.findByIdAndUpdate(id, req.body, { new: true });
   res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  } 
}
//delete request to delete a user
export const deleteUser=async (req, res) => {
  try {
    const {id} = req.params;
    const userExist = await User.findOne({_id: id});
    if (!userExist) {   
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}