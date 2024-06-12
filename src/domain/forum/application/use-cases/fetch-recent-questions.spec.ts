import { QuestionsRepository } from '../repositories/questions-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { MakeQuestion } from 'test/factories/make-question';
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions';

let questionRepository : QuestionsRepository
let sut : FetchRecentQuestionsUseCase

describe('Listagem de perguntas recentes', () => {

	beforeEach(async () => {
		questionRepository = new InMemoryQuestionsRepository()
		sut = new FetchRecentQuestionsUseCase(questionRepository)
	})

	test('deve ser capaz de listar as ultimas perguntas', async () => {
		await questionRepository.create(MakeQuestion({
			createdAt: new Date(2024, 5, 22)
		}))

		await questionRepository.create(MakeQuestion({
			createdAt: new Date(2024, 5, 10)
		}))

		await questionRepository.create(MakeQuestion({
			createdAt: new Date(2024, 5, 13)
		}))

		const { questions } = await sut.execute({
			page: 1
		})

		expect(questions).toHaveLength(3)
		expect(questions).toEqual([
			expect.objectContaining({
				createdAt: new Date(2024, 5, 22)
			}),
			expect.objectContaining({
				createdAt: new Date(2024, 5, 13)
			}),
			expect.objectContaining({
				createdAt: new Date(2024, 5, 10)
			})
		])

	})

	test('deve ser capaz de listar as ultimas perguntas com paginação', async () => {
		
		for (let i = 1; i <= 22; i++) {
			await questionRepository.create(MakeQuestion())
		}

		const { questions } = await sut.execute({
			page: 2
		})

		expect(questions).toHaveLength(2)
	})
}) 

