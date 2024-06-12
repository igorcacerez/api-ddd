import { MakeQuestion } from 'test/factories/make-question';
import { FetchQuestionAnswersUseCase } from './fetch-question-answers';
import { AnswersRepository } from '../repositories/answers-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { QuestionsRepository } from '../repositories/questions-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { MakeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let answersRepository : AnswersRepository
let questionRepository : QuestionsRepository
let sut : FetchQuestionAnswersUseCase

describe('Listagem de respostas de uma pergunta', () => {

	beforeEach(async () => {
		answersRepository = new InMemoryAnswersRepository()
		questionRepository = new InMemoryQuestionsRepository()
		sut = new FetchQuestionAnswersUseCase(answersRepository)
	})

	test('deve ser capaz de listar as respostas de uma pergunta', async () => {
		await questionRepository.create(MakeQuestion(
			{}, 
			new UniqueEntityID('pergunta')
		))

		await answersRepository.create(MakeAnswer())

		await answersRepository.create(MakeAnswer({
			content: 'resposta 1',
			questionId: new UniqueEntityID('pergunta')
		}))

		await answersRepository.create(MakeAnswer({
			content: 'resposta 2',
			questionId: new UniqueEntityID('pergunta')
		}))

		const { answers } = await sut.execute({
			questionId: 'pergunta', 
			page: 1
		})

		expect(answers).toHaveLength(2)
	})

	test('deve ser capaz de listar as respostas com paginação', async () => {
		await questionRepository.create(MakeQuestion(
			{}, 
			new UniqueEntityID('pergunta')
		))

		for (let i = 1; i <= 22; i++) {
			await answersRepository.create(MakeAnswer({
				questionId: new UniqueEntityID('pergunta')
			}))
		}

		const { answers } = await sut.execute({
			questionId: 'pergunta', 
			page: 2
		})

		expect(answers).toHaveLength(2)
	})
}) 

