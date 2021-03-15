class JwtDAO {

	static myInstance = null;

	static getInstance() {
        if (JwtDAO.myInstance == null) {
            JwtDAO.myInstance = new JwtDAO();
        }

        return this.myInstance;
    }

	saveJWT(token) {
		localStorage.setItem('token', token);
	}

	getJWT() {
		return localStorage.getItem('token');
	}

}
export default JwtDAO;