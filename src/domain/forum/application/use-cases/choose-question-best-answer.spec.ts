import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswersRepository } from '../repositories/answers-repository';
import { MakeAnswer } from 'test/factories/make-answer';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { QuestionsRepository } from '../repositories/questions-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { MakeQuestion } from 'test/factories/make-question';

let answerRepository : AnswersRepository
let questionRepository : QuestionsRepository
let sut : ChooseQuestionBestAnswerUseCase

describe('Escolher melhor resposta', () => {

	beforeEach(async () => {
		answerRepository = new InMemoryAnswersRepository()
		questionRepository = new InMemoryQuestionsRepository()
		sut = new ChooseQuestionBestAnswerUseCase(
			questionRepository,
			answerRepository
		)
	})

	test('deve ser capaz de escolher a melhor resposta', async () => {

		const newQuestion = MakeQuestion({
			authorId: new UniqueEntityID('autor-pergunta'),
		}, new UniqueEntityID('id-pergunta'))

		questionRepository.create(newQuestion)


		for(let i = 1; i <= 5; i++) {
			const newAnswer = MakeAnswer({
				authorId: new UniqueEntityID(`autor-resposta-${i}`),
				questionId: new UniqueEntityID('id-pergunta')
			}, new UniqueEntityID(`id-resposta-${i}`))
    
			answerRepository.create(newAnswer)
		}

		const { question } = await sut.execute({ 
			answerId: 'id-resposta-3',
			authorId: 'autor-pergunta'
		})

		expect(question.bestAnswerId?.toString()).toEqual('id-resposta-3')
	})


	test('apenas o autor da pergunta pode escolher a melhor resposta', async () => {

		const newQuestion = MakeQuestion({
			authorId: new UniqueEntityID('autor-pergunta'),
		}, new UniqueEntityID('id-pergunta'))

		questionRepository.create(newQuestion)

		const newAnswer = MakeAnswer({
			authorId: new UniqueEntityID('autor-resposta'),
			questionId: new UniqueEntityID('id-pergunta')
		}, new UniqueEntityID('id-resposta'))

		answerRepository.create(newAnswer)

		await expect(() =>
			sut.execute({ 
				answerId: 'id-resposta',
			    authorId: 'autor-resposta'
			})
		).rejects.toBeInstanceOf(Error)
	
	})
}) 

