import React, { useState } from 'react';
import BookList from './BookList';
import style from '@/styles/CategoryList.module.css';

const categories = [
    "Architecture",
    "Art & Fashion",
    "Biography",
    "Business",
    "Crafts & Hobbies",
    "Drama",
    "Fiction",
    "Food & Drink",
    "Health & Wellbeing",
    "History & Politics",
    "Humor",
    "Poetry",
    "Psychology",
    "Science",
    "Technology",
    "Travel & Maps"
];

const CategoryList: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    return (
        <section className={style.contentWrapper}>
            <nav className={style.categoryList}>
                <ul id="category-list">
                    {categories.map(category => (
                        <li
                            key={category}
                            className={activeCategory === category ? style.active : ''}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </nav>
            <BookList category={activeCategory} />
        </section>
    );
};

export default CategoryList;
