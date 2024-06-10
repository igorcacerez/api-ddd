import { AnswersRepository } from '../repositories/answers-repository';
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let answersRepository : AnswersRepository
let sut : AnswerQuestionUseCase

describe('Criação de Answer', () => {

	beforeEach(async () => {
		answersRepository = new InMemoryAnswersRepository()
		sut = new AnswerQuestionUseCase(answersRepository)
	})

	test('deve ser possivel criar uma resposta', async () => {
		const { answer } = await sut.execute({
			questionId: '1',
			instructorId: '1',
			content: 'Nova Resposta'
		})
	
		expect(answer.content).toEqual('Nova Resposta')
	})
})

