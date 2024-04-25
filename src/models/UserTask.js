class UserTask{
	#userId;
	#taskId;
	#delivered; // Date
	#score;
	#isDelivered = false;
	#isDeleted = false;

	constructor(userId, taskId, delivered, score, isDelivered, isDeleted){
		this.#userId = userId;
		this.#taskId = taskId;
		this.#delivered = delivered;
		this.#score = score;
		this.#isDelivered = isDelivered;
		this.#isDeleted = isDeleted;
	}

	// Getters
	get userId() { return this.#userId; }

	get taskId() { return this.#taskId; }

	get delivered() { return this.#delivered; }

	get score() { return this.#score; }
	
	get isDelivered() { return this.#isDelivered; }

	get isDeleted() { return this.#isDeleted; }

	// Setters
	set userId(userId) { this.#userId = userId; }

	set taskId(taskId) { this.#taskId = taskId; }

	set delivered(delivered) { this.#delivered = delivered; }

	set score(score) { this.#score = score; }

	set isDelivered(isDelivered) { this.#isDelivered = isDelivered; }

	set isDeleted(isDeleted) { this.#isDeleted = isDeleted; }

	toJSON(){
		return {
			UserId: this.#userId,
			TaskId: this.#taskId,
			Delivered: this.#delivered,
			Score: this.#score,
			IsDeleted: this.#isDeleted,
			IsDelivered: this.#isDelivered
		}
	}
}

module.exports = UserTask;