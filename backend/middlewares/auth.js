
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};
  
  export function   validateTaskInput(req, res, next) {
    const { title, deadline } = req.body;
  
    if (!title || !deadline) {
      return res.status(400).json({ message: 'Title and deadline are required' });
    }
  
    if (new Date(deadline) < new Date()) {
      return res.status(400).json({ message: 'Deadline must be in the future' });
    }
  
    next();
  }
export default isAuthenticated;