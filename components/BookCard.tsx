import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import style from '@/styles/BookCard.module.css';

interface BookCardProps {
    title: string;
    authors: string;
    price: string;
    image: string;
    description: string;
    rating: number;
}

const BookCard: React.FC<BookCardProps> = ({
    title,
    authors,
    price,
    image,
    description,
    rating,
}) => {
    const dispatch = useDispatch();
    const [isInCart, setIsInCart] = useState(false);
    const [reviews, setReviews] = useState<number>(0);

    useEffect(() => {
        setReviews(Math.floor(Math.random() * (500 - 1 + 1)) + 1);
    }, []);

    const truncateDescription = (text: string) => {
        const maxLength = 123;
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const handleAddToCart = () => {
        if (!isInCart) {
            dispatch(
                addToCart({
                    title,
                    authors,
                    price,
                    image,
                    rating,
                    quantity: 1,
                    reviews,
                })
            );
            setIsInCart(true);
        }
    };

    return (
        <div className={style.book}>
            <Image
                src={image || '/img/placeholder.png'}
                alt={title}
                className={style.bookImage}
                width={150} 
                height={225} 
                priority
            />
            <div className={style.bookInfo}>
                <p className={style.bookAuthors}>{authors}</p>
                <h3 className={style.bookTitle}>{title}</h3>
                <div className={style.bookRating}>
                    {'★'.repeat(Math.floor(rating))}
                    {'☆'.repeat(5 - Math.floor(rating))}
                    <span className={style.reviews}>{reviews} reviews</span>
                </div>
                <p className={style.bookDescription}>
                    {truncateDescription(description)}
                </p>
                <p className={style.bookPrice}>${price}</p>
                <button
                    className={`${style.buyButton} ${isInCart ? style.inCartButton : ''}`}
                    onClick={handleAddToCart}
                    disabled={isInCart}
                >
                    {isInCart ? 'IN THE CART ' : 'BUY NOW'}
                </button>
            </div>
        </div>
    );
};

export default BookCard;
