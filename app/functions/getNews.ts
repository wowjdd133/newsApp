import axios from "axios";

type Props = {
    country?: string,
    size?: number,
    category?: string,
    query?: string
}

export const getNews = async ({ country = 'kr', size = 5, category = '', query='' }: Props) => {
    let countryString = country.length !== 0 ? `&country=${country}` : ''
    let sizeString = `&size=${size}`
    let categoryString = ``
    let queryString = ``
    if(category.length !== 0) {
        categoryString = `&category=${category}`
    }
    if(query.length !== 0) {
        queryString = `&q=${query}`
    }

    try {
        const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}${categoryString}${countryString}${sizeString}${queryString}`);
        if (response && response.data) {
            return response.data.results
        }
    } catch (err) {
        console.log(err);
    }

    return []
}

export const getNewsForId = async ({id}: {id: string}) => {
    let idString = `&id=${id}`
    try {
        const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_API_KEY}${idString}`);
        if (response && response.data) {
            return response.data.results
        }
        return [];
    } catch (err) {
        console.log(err);
    }
}