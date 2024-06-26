import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
	authorId: string
    questionId: string
    title: string
    content: string
}

interface EditQuestionUseCaseResponse {
	question: Question
}

export class EditQuestionUseCase {
	constructor (private questionsRepository : QuestionsRepository) {}

	async execute({
		questionId,
		authorId,
		content,
		title
	} : EditQuestionUseCaseRequest) : Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId)

		if (!question) {
			throw new Error('Question not found.')
		}

		if (question.authorId.toString() !== authorId) {
			throw new Error('Permission denied.')
		}

		question.title = title
		question.content = content

		await this.questionsRepository.save(question)

		return {
			question
		}
	}
}