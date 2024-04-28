class Profile {
	
	static USER = new Profile(1, 'USER');
	static ADMIN = new Profile(2, 'ADMIN');

	#id;
	#name;

	constructor(id, name){
		this.#id = id;
		this.#name = name;
	}

	get id() { return this.#id; }
	get name() { return this.#name; }


	toJSON(){
		return {
			id: this.#id,
			name: this.#name
		};
	}

}

module.exports = Profile;