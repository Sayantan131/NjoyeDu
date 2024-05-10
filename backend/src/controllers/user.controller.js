export const registerUser = async (req, res) => {
  const { name, email, password, phone, avatar } = req.body;

  if(!name || !email || !password || !phone || !avatar) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    
  } catch (error) {
    
  }
};
