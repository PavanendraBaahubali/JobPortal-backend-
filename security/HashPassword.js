const bcrypt = require('bcrypt');

const HashPassword = function(schema) {
        // Use a regular function here to access `this`
        schema.pre('save', async function (next) {
            const user = this;

            // Only hash the password if it has been modified (or is new)
            if (!user.isModified('password')) return next();

            try {
                // Generate a salt and hash the password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                next(); // Proceed to the next middleware (if any) or save the user
            } catch (err) {
                next(err); // Pass error to the next middleware
            }
});
}
const hashCompare = (enteredPassword, userPassword) => {
    return bcrypt.compare(enteredPassword, userPassword);
}

module.exports = {HashPassword, hashCompare};