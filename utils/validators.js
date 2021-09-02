const mongoose = require('mongoose')

function validateName(name) {
	const regex = /^[a-zA-Z ]*$/
	return regex.test(name)
}

function validatePassword(password) {
	const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
	return regex.test(password)
}

function validateReviewRating(rating) {
    return rating > 0 && rating <= 5
}

function validateObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}

function handleValidationErrors(err) {
    if(err.name === "ValidationError") {
        let validationErrors = "";

        Object.keys(err.errors).forEach((key) => {
            console.log(key);
            validationErrors = validationErrors + (validationErrors && "\n") + err.errors[key].message;
        });

        console.log(validationErrors);
        return { message: validationErrors }
    } else {
        return { message: err }
    }
}

function handleAuthErrors(err) {
    if(err.code === 11000) {
        return { email: "Email Already Exists"}
    }

    if(err.name === "ValidationError") {
        let validationErrors = {}
        const { name, email, password } = err.errors

        if("name" in err.errors) {
            validationErrors.name = name.message
        }

        if("email" in err.errors) {
            validationErrors.email = email.message
        }

        if("password" in err.errors) {
            validationErrors.password = password.message
        }

        return validationErrors
    } else {
        return { message: err }
    }
}

module.exports = { validateName, validatePassword, validateObjectId, 
    validateReviewRating, handleValidationErrors, handleAuthErrors }