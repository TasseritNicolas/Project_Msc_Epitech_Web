module.exports = async functionToUpdateWithHashedPassword() {
    try {
        const updatedUser = await user.update(updates);
        done(null, updatedUser);
    } catch (err) {
        done(err);
    }
}
