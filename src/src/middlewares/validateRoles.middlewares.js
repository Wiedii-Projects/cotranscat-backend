const isRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                status: false,
                data: null,
                errors: 'To verify the role, the token must first be validated.'
            });
        };

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                status: false,
                data: null,
                errors: `The service requires one of the following roles ${roles}`
            });
        };
        
        next();
    }
};

module.exports = {
    isRole
}