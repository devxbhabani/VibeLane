export const checkHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'VibeLane API is healthy and running',
    timestamp: new Date().toISOString(),
  });
};
