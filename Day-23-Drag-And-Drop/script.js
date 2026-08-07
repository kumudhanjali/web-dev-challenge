/* ========================================= */
/* DAY 23: DRAG AND DROP API */
/* ========================================= */

// 1. SELECT TARGETS
const taskCards = document.querySelectorAll('.task-card');
const kanbanColumns = document.querySelectorAll('.kanban-column .task-list');

// 2. CONFIGURE THE DRAGGABLE ITEMS
taskCards.forEach(card => {

    card.addEventListener('dragstart', () => {

        card.classList.add('is-dragging');

    });

    card.addEventListener('dragend', () => {

        card.classList.remove('is-dragging');

    });

});

// 3. CONFIGURE THE DROP ZONES
kanbanColumns.forEach(column => {

    column.addEventListener('dragover', (e) => {

        e.preventDefault();

        const draggedCard = document.querySelector('.is-dragging');

        column.appendChild(draggedCard);

    });

});