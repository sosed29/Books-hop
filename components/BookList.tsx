import React, { useEffect, useState, useCallback } from 'react';
import BookCard from './BookCard';
import style from '@/styles/CategoryList.module.css';

interface VolumeInfo {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail: string };
    description?: string;
}

interface Item {
    volumeInfo: VolumeInfo;
}

interface Book {
    title: string;
    authors: string;
    price: string;
    image: string;
    description: string;
    rating: number;
}

interface BookListProps {
    category: string;
}

const BookList: React.FC<BookListProps> = ({ category }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1); 
    const [loading, setLoading] = useState(false); 
    const [hasMore, setHasMore] = useState(true); 

    const fetchBooks = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/books?subject=${category}&page=${page}`);
            const data = await response.json();

            if (!data.items || data.items.length === 0) {
                setHasMore(false); 
                return;
            }

            const formattedBooks = data.items.map((item: Item) => ({
                title: item.volumeInfo.title || 'No Title',
                authors: item.volumeInfo.authors?.join(', ') || 'Unknown',
                price: `${(Math.random() * 20 + 5).toFixed(2)}`,
                image: item.volumeInfo.imageLinks?.thumbnail || '/img/placeholder.png',
                description: item.volumeInfo.description || 'No description available',
                rating: Math.random() * 5,
            }));

            setBooks((prevBooks) => [...prevBooks, ...formattedBooks]); 
        } catch (error) {
            console.error('Ошибка при загрузке книг:', error);
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        setBooks([]); 
        setPage(1); 
        setHasMore(true); 
        fetchBooks(1); 
    }, [category, fetchBooks]);

    const loadMoreBooks = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBooks(nextPage);
    };

    return (
        <div className={style.bookList}>
            {books.map((book, index) => (
                <div key={`${book.title}-${index}`} className={style.bookCard}>
                    <BookCard {...book} /> 
                </div>
            ))}
            {hasMore && (
                <button onClick={loadMoreBooks} className={style.loadMoreButton} disabled={loading}>
                    {loading ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    );
};

export default BookList;
