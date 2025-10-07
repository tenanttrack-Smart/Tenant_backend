export function authorizeRole(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error authorizing role",
        error: error.message,
      });
    }
  };
}
