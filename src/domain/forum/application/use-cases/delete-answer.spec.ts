import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerUseCase } from './delete-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswersRepository } from '../repositories/answers-repository';
import { MakeAnswer } from 'test/factories/make-answer';

let answerRepository : AnswersRepository
let sut : DeleteAnswerUseCase

describe('Exclusão de Resposta', () => {

	beforeEach(async () => {
		answerRepository = new InMemoryAnswersRepository()
		sut = new DeleteAnswerUseCase(answerRepository)
	})

	test('deve ser capaz de deletar uma resposta', async () => {

		const newAnswer = MakeAnswer({
			authorId: new UniqueEntityID('1')
		}, new UniqueEntityID('id-deleta'))

		answerRepository.create(newAnswer)

		expect(answerRepository.items).toHaveLength(1)

		await sut.execute({ 
			answerId: 'id-deleta',
			authorId: '1'
		})

		expect(answerRepository.items).toHaveLength(0)
	
	})

	test('nao deve deletar uma resposta se o author nao for o mesmo', async () => {

		const newAnswer = MakeAnswer({
			authorId: new UniqueEntityID('1')
		}, new UniqueEntityID('id-deleta'))
		answerRepository.create(newAnswer)

		await expect(() =>
			sut.execute({ 
				answerId: 'id-deleta',
				authorId: '2'
			})
		).rejects.toBeInstanceOf(Error)
	
	})
}) 

