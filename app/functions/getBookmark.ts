import AsyncStorage from "@react-native-async-storage/async-storage";

export const getBookmark = async (newsId: string): Promise<{
    res: Array<string>,
    data: string | null
}> => {
    try {
        const token = await AsyncStorage.getItem("bookmark");
        if(token == null) throw Error;
        const res = JSON.parse(token);
        if (res == null) throw Error;
        let data = res.find((value: string) => value === newsId);
        return {
            res,
            data
        };
    } catch (err) {
        return {
            res: [],
            data: null
        };
    }

}