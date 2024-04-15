class Task {

	#id;
	#title;
	#description;
	#date

	constructor(title, description, date){
		this.#title = title;
		this.#description = description;
		this.#date = date;
	}

	// Getters

	get id(){ return this.#id; }

	get title(){ return this.#title; }

	get description(){ return this.#description; }

	get deliveryDate(){ return this.#date; }


	// Setters 

	set id(id){ this.#id = id; } // id is set by the database

	set title(title) { this.#title = title; }

	set description(description) { this.#description = description; }

	set date(date) { this.#date = date; }


	toJSON(){
		return {
			id: this.#id,
			title: this.#title,
			description: this.#description,
			date: this.#date
		}
	}


}

module.exports = Task;