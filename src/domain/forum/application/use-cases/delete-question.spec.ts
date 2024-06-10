import { QuestionsRepository } from '../repositories/questions-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { MakeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteQuestionUseCase } from './delete-question';

let questionRepository : QuestionsRepository
let sut : DeleteQuestionUseCase

describe('Exclusão de Questão', () => {

	beforeEach(async () => {
		questionRepository = new InMemoryQuestionsRepository()
		sut = new DeleteQuestionUseCase(questionRepository)
	})

	test('deve ser capaz de deletar uma questão', async () => {

		const newQuestion = MakeQuestion({
			authorId: new UniqueEntityID('1')
		}, new UniqueEntityID('id-deleta'))
		questionRepository.create(newQuestion)

		expect(questionRepository.items).toHaveLength(1)

		await sut.execute({ 
			questionId: 'id-deleta',
			authorId: '1'
		})

		expect(questionRepository.items).toHaveLength(0)
	
	})

	test('nao deve deletar uma questao se o author nao for o mesmo', async () => {

		const newQuestion = MakeQuestion({
			authorId: new UniqueEntityID('1')
		}, new UniqueEntityID('id-deleta'))
		questionRepository.create(newQuestion)

		await expect(() =>
			sut.execute({ 
				questionId: 'id-deleta',
				authorId: '2'
			})
		).rejects.toBeInstanceOf(Error)
	
	})
}) 

