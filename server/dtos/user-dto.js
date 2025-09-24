
// определили что точно содерджит объект User
module.exports = class UserDto {
    email;
    id;
    isActivated;
    roles

    constructor(model){
        this.email = model.email
        this.id = model.id
        this.isActivated = model.isActivated
        this.roles = model.roles
    }
}