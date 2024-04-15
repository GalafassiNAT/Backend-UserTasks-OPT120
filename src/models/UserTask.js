class UserTask{
	#userId;
	#taskId;
	#delivered; // Date
	#score;

	constructor(userId, taskId, delivered, score){
		this.#userId = userId;
		this.#taskId = taskId;
		this.#delivered = delivered;
		this.#score = score;
	}

	// Getters
	get userId() { return this.#userId; }

	get taskId() { return this.#taskId; }

	get delivered() { return this.#delivered; }

	get score() { return this.#score; }

	// Setters
	set userId(userId) { this.#userId = userId; }

	set taskId(taskId) { this.#taskId = taskId; }

	set delivered(delivered) { this.#delivered = delivered; }

	set score(score) { this.#score = score; }


	toJSON(){
		return {
			userId: this.#userId,
			taskId: this.#taskId,
			delivered: this.#delivered,
			score: this.#score
		}
	}
}

module.exports = UserTask;