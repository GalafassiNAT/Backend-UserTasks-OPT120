class Task {

	#id;
	#title;
	#description;
	#deliveryDate

	constructor(title, description, deliveryDate){
		this.#title = title;
		this.#description = description;
		this.#deliveryDate = deliveryDate;
	}

	// Getters

	get id(){ return this.#id; }

	get title(){ return this.#title; }

	get description(){ return this.#description; }

	get deliveryDate(){ return this.#deliveryDate; }


	// Setters 

	set id(id){ this.#id = id; } // id is set by the database

	set title(title) { this.#title = title; }

	set description(description) { this.#description = description; }

	set deliveryDate(deliveryDate) { this.#deliveryDate = deliveryDate; }


	toJSON(){
		return {
			id: this.#id,
			title: this.#title,
			description: this.#description,
			deliveryDate: this.#deliveryDate
		}
	}


}

module.exports = Task;