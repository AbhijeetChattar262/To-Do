import { TodoServices } from './db-services/todo.service'; // Adjust the path as needed

// Sample user ID and task data
const userId = 7; // Replace with a valid user ID in your database
const sampleTasks = [
    'Buy groceries',
    'Finish homework',
    'Read a book',
    'Exercise for 30 minutes',
    'Call a friend'
];

async function seedData() {
    for (const task of sampleTasks) {
        try {
            const newTodo = await TodoServices.addTodo(userId, task);
            console.log('Added Todo:', newTodo);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }
}

// Run the seeding function
seedData().catch(error => console.error('Error seeding data:', error));
