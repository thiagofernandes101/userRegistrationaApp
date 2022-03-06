let userSpecifications = {}
userSpecifications.codeIsANumberGreaterThanZero = CodeIsANumberGreaterThanZero;
userSpecifications.emailStructureIsCorrect = EmailStructureIsCorrect;
userSpecifications.passwordRulesAreMet = PasswordRulesAreMet;

export default userSpecifications;

function CodeIsANumberGreaterThanZero(code) {
    return code != null && !isNaN(code) && parseInt(code) > 0
}

function EmailStructureIsCorrect(email) {
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return email != null && emailRegex.test(email)
}

function PasswordRulesAreMet(password) {
    const passwordRegex = new RegExp(/^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})/);
    return password != null && passwordRegex.test(password)
}