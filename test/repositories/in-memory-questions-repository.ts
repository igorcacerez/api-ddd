import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
	
	public items : Question[] = []

	async create(question: Question): Promise<void> {
		this.items.push(question)
	}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.items.find(item => item.slug?.value === slug)
		return question || null
	}

	async delete(question: Question): Promise<void> {
		const itemIndex = this.items.findIndex(item => item.id === question.id)
		this.items.splice(itemIndex, 1)
	}

	async findById(id: string): Promise<Question | null> {
		const question = this.items.find(item => item.id.toString() === id)
		return question || null
	}

	async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
		const itemsPerPage = 20
		const questions = this.items
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * itemsPerPage, page * itemsPerPage)
			
		return questions
	}

	async save(question: Question): Promise<void> {
		const itemIndex = this.items.findIndex(item => item.id === question.id)
		this.items[itemIndex] = question
	}
}