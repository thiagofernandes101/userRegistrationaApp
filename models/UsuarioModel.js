import userSpecifications from "../specifications/UserSpecifications";

export class UserModel {
    constructor(id, code, name, email, password) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    isValid() {
        let isCodeValid = userSpecifications.codeIsANumberGreaterThanZero(this.code)
        let isEmailValid = userSpecifications.emailStructureIsCorrect(this.email);
        let isPasswordValid = userSpecifications.passwordRulesAreMet(this.password);

        return isCodeValid && isEmailValid && isPasswordValid;
    }
}