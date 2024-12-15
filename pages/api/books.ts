import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: true, message: 'Method not allowed. Use GET.' });
    }

    const { subject, page } = req.query;

    if (!subject) {
        return res.status(400).json({ error: true, message: 'No subject provided in query params' });
    }

    const startIndex = page ? (parseInt(page as string) - 1) * 6 : 0;

    const gbooksReqParams = new URLSearchParams();
    gbooksReqParams.set('q', `subject:${subject}`);
    gbooksReqParams.set('startIndex', startIndex.toString());
    gbooksReqParams.set('maxResults', '6');

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`);
        const booksData = await response.json();

        if (!booksData.items) {
            return res.status(404).json({ error: true, message: 'No books found for this subject.' });
        }

        res.status(200).json({ items: booksData.items });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
}
