import { AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
	authorId: string
    answerId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
	constructor (private answersRepository : AnswersRepository) {}

	async execute({
		answerId,
		authorId
	} : DeleteAnswerUseCaseRequest) : Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId)

		if (!answer) {
			throw new Error('Answer not found.')
		}

		if (answer.authorId.toString() !== authorId) {
			throw new Error('Permission denied.')
		}

		await this.answersRepository.delete(answer)

		return {}
	}
}