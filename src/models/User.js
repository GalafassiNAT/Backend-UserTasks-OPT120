const Profile = require("./Profile");

class User {

	#id = null;
	#name = null;
	#email = null;
	#password = null;
	#profile = new Profile; // Default profile is USER

	constructor(name, email, password, profile){
		this.#name = name;
		this.#email = email;
		this.#password = password;
		this.#profile = profile;
		
	}

	// Getters
	get id(){ return this.#id; }

	get name(){ return this.#name; }

	get email(){ return this.#email; }

	get password() { return this.#password; }

	get profile() { return this.#profile; }

	// Setters
	set id(id){ this.#id = id; } // id is set by the database

	set name(name){ this.#name = name; }

	set email(email){ this.#email = email; }

	set password(password){ this.#password = password; } // Password should be hashed before setting it

	set profile(profile){ this.#profile = profile; }

	toJSON(){
		return {
			id: this.#id,
			name: this.#name,
			email: this.#email,
			password: this.#password,
			profile: this.profile ? this.profile.toJSON() : undefined
		}
	}


}

module.exports = User;