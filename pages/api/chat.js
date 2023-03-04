export default (req, res) => {
    const { message } = req.query;
  
    // TODO: process the user's message and generate a response
  
    // Example response
    res.status(200).json({ message: 'Response from the server' });
  };
  