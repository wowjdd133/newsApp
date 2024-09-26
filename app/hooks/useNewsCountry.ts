import countryList from "@/constants/CountryList"
import { useCallback, useState } from "react"

export const useNewsCountryList = () => {
    const [newsCountryList, setNewsCountryList] = useState(countryList);

    const toggleNewsCountryList = useCallback((id: number) => {
        setNewsCountryList((prevNewsCountryList) => {
            return prevNewsCountryList.map((item, index) => {
                if(index === id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                }
                return item;
            })
        })
    }, []);

    return {
        newsCountryList,
        toggleNewsCountryList
    }
}