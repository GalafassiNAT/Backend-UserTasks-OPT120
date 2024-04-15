class User {

	#id = null;
	#name = null;
	#email = null;
	#password = null;

	constructor(name, email, password){
		this.#name = name;
		this.#email = email;
		this.#password = password;
	}


	// Getters
	get id(){ return this.#id; }

	get name(){ return this.#name; }

	get email(){ return this.#email; }

	get password() { return this.#password; }

	// Setters
	set id(id){ this.#id = id; } // id is set by the database

	set name(name){ this.#name = name; }

	set email(email){ this.#email = email; }

	set password(password){ this.#password = password; } // Password should be hashed before setting it

	toJSON(){
		return {
			id: this.#id,
			name: this.#name,
			email: this.#email,
			password: this.#password
		}
	}


}

module.exports = User;