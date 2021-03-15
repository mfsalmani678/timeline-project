class UserDAO {

	static myInstance = null;

	static getInstance() {
        if (UserDAO.myInstance == null) {
            UserDAO.myInstance = new UserDAO();
        }

        return this.myInstance;
    }

	saveUser(user) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	getUser() {
		return JSON.parse(localStorage.getItem('user'));
	}

}
export default UserDAO;